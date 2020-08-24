const SolicitacaoProduto = require("./solicitacao-produto2");
const ProdutoSolicitado = require("../produto_solicitado/produto-solicitado");
const Produto = require("../produto/produto");
const errorHandler = require("../common/errorHandler");
SolicitacaoProduto.methods(["get", "post", "put"]);
SolicitacaoProduto.updateOptions({ new: true, runValidators: true });
SolicitacaoProduto.after("post", errorHandler).after("put", errorHandler);
const eStatus = new Set([
  "ABERTO",
  "PRODUZINDO",
  "ENTREGUE",
  "PAGO",
  "SLC_CANCELAMENTO",
  "CANCELADO",
]);
const EmailService = require("../../config/emailService");
const User = require("../user/user");
const env = require("../../.env");
const moment = require("moment");
const dateFns = require("date-fns");
const metaVenda = 300;

const setFiltroBusca = (filtro, res) => {
  const query = {};
  if (filtro) {
    if (filtro.status) {
      if (eStatus.has(filtro.status)) {
        query["status"] = filtro.status;
      } else {
        console.warn(new Date(), `Status ${filtro.status} não encontrado`);
        // return res.status(200).json({errors: [`Status ${filtro.status} não encontrado`]})
      }
    }

    if (filtro.dataDesejada) {
      query["dataDesejada"] = {};
      if (filtro.dataDesejada.start) {
        query["dataDesejada"]["$gte"] = filtro.dataDesejada.start;
      }
      if (filtro.dataDesejada.end) {
        query["dataDesejada"]["$lte"] = filtro.dataDesejada.end;
      }
    }

    if (filtro.dataCriacao) {
      query["criadoEm"] = {};
      if (filtro.dataCriacao.start) {
        query["criadoEm"]["$gte"] = filtro.dataCriacao.start;
      }
      if (filtro.dataCriacao.end) {
        query["criadoEm"]["$lte"] = filtro.dataCriacao.end;
      }
    }
  }
  return query;
};

const buscar = (query, res, pageNumber = 1, nPerPage = 10, permissoes = []) => {
  SolicitacaoProduto.find(query)
    .populate("usuario")
    .populate({
      path: "produtos",
      populate: {
        path: "produto",
      },
    })
    .sort({ status: -0, criadoEm: -1 })
    .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
    .limit(nPerPage)
    .exec((err, solicitacoes) => {
      if (err) {
        return res.status(500).json({ errors: [err.message] });
      } else {
        SolicitacaoProduto.countDocuments(query, (errCount, count) => {
          if (errCount) {
            return res.status(500).json({ errors: [errCount.message] });
          } else {
            return res.json({ solicitacoes, count, permissoes });
          }
        });
      }
    });
};

// Buscar - Todas solicitações
SolicitacaoProduto.route("buscarGeral", (req, res, next) => {
  User.findById(req.decoded._id)
    .populate({
      path: "cargo",
      populate: {
        path: "permissoes",
      },
    })
    .populate("equipe")
    .exec((err, usr) => {
      if (
        usr.hierarquia === "REITOR" ||
        usr.hierarquia === "CONSELHO_GESTOR" ||
        (usr.hierarquia === "SEMINARISTA" &&
          usr.equipe &&
          usr.equipe.role === "PRODUTO")
      ) {
        const permissoes = buscarPermissõesStatus(usr)
        return buscar(
          setFiltroBusca(req.body.filtro, res),
          res,
          req.body.pageNumber,
          req.body.nPerPage,
          permissoes
        );
      } else {
        return res
          .status(403)
          .json({ errors: ["Você não possui permissão para fazer isso"] });
      }
    });
});


function buscarPermissõesStatus (usr) {
  if(
    usr.hierarquia === "REITOR" ||
    usr.hierarquia === "CONSELHO_GESTOR" ||
    (usr.hierarquia === "SEMINARISTA" && usr.coordenaEquipe)
    ) {
      return ['ABERTO', 'PRODUZINDO', 'ENTREGUE', 'SLC_CANCELAMENTO', 'RELATORIO']
  } else {
    return (usr.cargo.permissoes || [] ).map(it => {
      switch(it.nome) {
        case 'ALTERAR_STATUS_PRODUZINDO':
          return 'ABERTO'
        case 'ALTERAR_STATUS_ENTREGUE':
          return 'PRODUZINDO'
        case 'ALTERAR_STATUS_PAGO':
          return 'ENTREGUE'
        case 'APROVA_CANCELAMENTO':
          return 'SLC_CANCELAMENTO'
        case 'VER_RELATORIO':
          return 'RELATORIO'
      }
    })
  }
}

SolicitacaoProduto.route("solicitarCancelamento", (req, res, next) => {
  const id = req.body.solicitacaoId;
  const usuario = req.decoded._id;
  User.findById(usuario, (err, usr) => {
    SolicitacaoProduto.findById(id)
      .populate({
        path: "produtos",
        populate: {
          path: "produto",
        },
      })
      .exec((err, sol) => {
        if (err) {
          print(err);
        } else {
          if (sol.status !== "ABERTO") {
            return res.status(403).json({
              errors: ["Somente é possivel cancelar solicitações em aberto."],
            });
          }
          const dataDesejada = moment(sol.dataDesejada).format("DD/MM/YYYY");
          const dataDesejadaQuery = moment(sol.dataDesejada).format(
            "YYYY-MM-DD"
          );
          const href = `${
            env.url
          }/pages/admin/solicitacoes?status=${"SLC_CANCELAMENTO"}&dtDjEnd=${dataDesejadaQuery}&dtDjStart=${dataDesejadaQuery}&usuario=${usuario}`;
          const produtos = sol.produtos.map(
            (element) =>
              `<li>${element.produto.nome} - ${element.quantidade}</li>`
          );
          sol.status = "SLC_CANCELAMENTO";
          sol.save();
          EmailService.enviarEmail({
            subject: `${usr.name} solicitou um cancelamento - Dt. Desejada: ${dataDesejada}`,
            html: `<p><b>Data Deseja:</b> ${dataDesejada}</p>
          <p><b>produtos:</b>
          <ul>
            ${produtos.toString().replace(/,/g, "")}
          </ul></p>
          <p>Acesse a solicitação <a href="${href}">clicando aqui</a></p>`,
          });
          return res.json(sol);
        }
      });
  });
});

const validaComum = (user) => {
  return user.hierarquia === "REITOR" ||
    user.hierarquia === "CONSELHO_GESTOR" ||
    (user.equipe && user.coordenaEquipe && user.equipe.role === "PRODUTO");
};

// Alterar status
SolicitacaoProduto.route("alterar-status", (req, res, next) => {
  const solicitacoes = req.body.solicitacoes;
  const cancelamento = req.body.cancelamento;
  const status = req.body.status;
  const usuario = req.decoded._id;
  const set = {};
  User.findById(usuario)
    .populate({
      path: "cargo",
      populate: {
        path: "permissoes",
      },
    })
    .populate("equipe")
    .exec((err, user) => {
      const permissaoGeral = validaComum(user);
      const permissoes =
        (user.equipe &&
          user.equipe.role === "PRODUTO" &&
          user.cargo &&
          user.cargo.permissoes) ||
        [];
      let novoStatus; // Altera para o próximo status na cadeia
      switch (status) {
        case "ABERTO":
          if (
            permissaoGeral ||
            permissoes.some((p) => p.nome === "ALTERAR_STATUS_PRODUZINDO")
          ) {
            novoStatus = "PRODUZINDO";
          } else {
            return res.status(403).json({
              errors: ["Você não tem permissão para alterar esse status"],
            });
          }
          break;
        case "PRODUZINDO":
          if (
            permissaoGeral ||
            permissoes.some((p) => p.nome === "ALTERAR_STATUS_ENTREGUE")
          ) {
            novoStatus = "ENTREGUE";
          } else {
            return res.status(403).json({
              errors: ["Você não tem permissão para alterar esse status"],
            });
          }
          break;
        case "ENTREGUE":
          if (
            permissaoGeral ||
            permissoes.some((p) => p.nome === "ALTERAR_STATUS_PAGO")
          ) {
            set.pagoEm = new Date();
            novoStatus = "PAGO";
          } else {
            return res.status(403).json({
              errors: ["Você não tem permissão para alterar esse status"],
            });
          }
          break;
        case "SLC_CANCELAMENTO":
          if (
            permissaoGeral ||
            permissoes.some((p) => p.nome === "APROVA_CANCELAMENTO")
          ) {
            if (cancelamento.cancelado) {
              novoStatus = "CANCELADO";
              EmailService.enviarEmail({
                subject: `Sua solicitação de cancelamento foi aprovada`,
                html: `
                <p>Sua solicitação de cancelamento foi aprovada e seu status já foi aprovado</p>
                <p>Veja sua solicitação <a>clicando aqui</a></p>
              `,
              });
            } else {
              novoStatus = "ABERTO";
              EmailService.enviarEmail({
                subject: `Sua solicitação de cancelamento não foi aprovada`,
                html: `
                <p>Sua solicitação de cancelamento não foi aprovada pelo seguinte motivo: </p>
                <p>${cancelamento.justificativa}</p>
              `,
              });
            }
          } else {
            return res.status(403).json({
              errors: ["Você não tem permissão para alterar esse status"],
            });
          }
          break;
        case "PAGO":
          break;
        case undefined:
          return res.status(403);
      }
      set.status = novoStatus;

      SolicitacaoProduto.updateMany(
        {
          _id: { $in: solicitacoes },
        },
        {
          $set: set,
        },
        (err, rs) => {
          if (err) {
            return res.status(500).json({ errors: [err] });
          } else {
            return res.json(rs);
          }
        }
      );
    });
});

// Buscar - Solicitações usuário
SolicitacaoProduto.route("buscar", (req, res, next) => {
  const usuario = req.decoded._id;
  // const query = {usuario, ...setFiltroBusca(req.body.filtro, res)};
  buscar(
    { usuario, ...setFiltroBusca(req.body.filtro, res) },
    res,
    req.body.pageNumber,
    req.body.nPerPage
  );
});

SolicitacaoProduto.route("validarTelaRelatorio", (req, res, next) => {
  User.findById(req.decoded._id)
    .populate({
      path: "cargo",
      populate: {
        path: "permissoes",
      },
    })
    .populate("equipe")
    .exec((err, usr) => {
      if (
        usr.hierarquia === "REITOR" ||
        usr.hierarquia === "CONSELHO_GESTOR" ||
        usr.hierarquia ===
          "FORMADOR"(
            (usr.hierarquia === "SEMINARISTA" &&
              usr.equipe &&
              usr.equipe.role === "PRODUTO" &&
              usr.coordenaEquipe) ||
              (usr.cargo &&
                usr.cargo.permissoes &&
                usr.cargo.permissoes.some((it) => it.nome === "VER_RELATORIO"))
          )
      ) {
        return res.json({ autorizado: true });
      } else {
        return res.status(403).json({ autorizado });
      }
    });
});

SolicitacaoProduto.route("validarTela", (req, res, next) => {
  User.findById(req.decoded._id)
    .populate({
      path: "cargo",
      populate: {
        path: "permissoes",
      },
    })
    .populate("equipe")
    .exec((err, usr) => {
      if (err) {
        return res.json(400).json(err);
      }
      if (
        usr.hierarquia === "REITOR" ||
        usr.hierarquia === "CONSELHO_GESTOR" ||
        usr.hierarquia === "FORMADOR" ||
        (usr.hierarquia === "SEMINARISTA" &&
          usr.equipe &&
          usr.equipe.role === "PRODUTO")
      ) {
        return res.json({ autorizado: true });
      } else {
        return res.status(403).json({ autorizado });
      }
    });
});

SolicitacaoProduto.route("salvar", (req, res, next) => {
  const usuario = req.decoded._id;
  const produtosSolicitados = req.body.produtos;
  let valorTotal = 0;

  Produto.find({}).then((p) => {
    const prodSolValor = produtosSolicitados.map((ps) => {
      const prr = p.find((prod) => prod._id == ps.produto);
      const valor = prr.valor * ps.quantidade;
      valorTotal += valor;
      return {
        ...ps,
        valor,
      };
    });
    const sp = new SolicitacaoProduto({
      dataDesejada: req.body.dataDesejada,
      usuario,
      valorTotal,
    });
    sp.save((err, solProd) => {
      if (err) {
        return sendErrorsFromDB(res, err);
      } else {
        const prods = prodSolValor.map((it) => ({
          ...it,
          solicitacao: solProd._id,
        }));
        ProdutoSolicitado.insertMany(prods, (err, prodsSol) => {
          if (err) {
            return sendErrorsFromDB(res, err);
          } else {
            solProd.produtos = prodsSol.map((it) => it._id);
            solProd.save((err, solProd2) => {
              if (err) {
                return res.status(500).json({ errors: [err] });
              } else {
                return res.json(solProd2);
              }
            });
          }
        });
      }
    });
  });
  return res.status(200);
});

const randomNumber = (n1) => {
  return Math.floor(Math.random() * n1) + 1;
};
const randomDate = (d1, d2) => {
  const start = new Date(d1);
  const end = new Date(d2);
  const x = [];
  return new Date(+start + Math.random() * (end - start));
};

SolicitacaoProduto.route("criarAleatorio", (req, res, next) => {
  const usuario = req.decoded._id;
  // const produtosSolicitados = req.body.produtos;
  const { quantidade, d1, d2, status } = req.body;
  const solicitacoes = [];
  let valorTotal = 0;
  Produto.find({}).then((p) => {
    for (let i = 0; i < quantidade; i++) {
      valorTotal = 0;
      const produtosSolicitados = [
        {
          quantidade: randomNumber(10),
          produto: p[randomNumber(p.length) - 1]._id,
        },
        {
          quantidade: randomNumber(10),
          produto: p[randomNumber(p.length) - 1]._id,
        },
      ];
      const prodSolValor = produtosSolicitados.map((ps) => {
        const prr = p.find((prod) => prod._id == ps.produto);
        const valor = prr.valor * ps.quantidade;
        valorTotal += valor;
        return {
          ...ps,
          valor,
        };
      });
      let pagoEm;
      if (status === "PAGO") {
        pagoEm = randomDate(d1, d2);
      }
      const sp = new SolicitacaoProduto({
        dataDesejada: randomDate(d1, d2),
        usuario,
        valorTotal,
        status,
        pagoEm,
      });
      sp.save((err, solProd) => {
        if (err) {
          return sendErrorsFromDB(res, err);
        } else {
          solicitacoes.push(solProd);
          const prods = prodSolValor.map((it) => ({
            ...it,
            solicitacao: solProd._id,
          }));
          ProdutoSolicitado.insertMany(prods, (err, prodsSol) => {
            if (err) {
              return sendErrorsFromDB(res, err);
            } else {
              solProd.produtos = prodsSol.map((it) => it._id);
              solProd.save((err, solProd2) => {
                if (err) {
                  return res.status(500).json({ errors: [err] });
                }
              });
            }
          });
        }
      });
    }
  });
  return res.json(solicitacoes);
});

SolicitacaoProduto.route("solicitacoesPagasRel", (req, res, next) => {
  podeVerRelatorio(req.decoded._id).then((autorizado) => {
    if (!autorizado) {
      return res
        .status(403)
        .json({ errors: ["Você não possui acesso a dados de relatório"] });
    } else {
      const filtroSolicitacao = [{ $eq: ["$_id", "$$solicitacaoId"] }];
      let dayQuery;
      const { frequencia, start, end } = req.body;
      if (!controleDeFrequenciaPeriodo(frequencia, start, end)) {
        return res.status(400).json({
          errors: ["Frequência não está de acordo com o período selecinado"],
        });
      }
      filtroSolicitacao.push({ $gte: ["$pagoEm", new Date(start)] });
      filtroSolicitacao.push({ $lte: ["$pagoEm", new Date(end)] });
      switch (frequencia) {
        case "diario":
          dayQuery = { $dayOfWeek: "$pagoEm" };
          break;
        case "semanal":
        default:
          dayQuery = { $dayOfMonth: "$pagoEm" };
          break;
        case "mensal":
          dayQuery = { $month: "$pagoEm" };
          break;
        case "anual":
          dayQuery = { $year: "$pagoEm" };
          break;
      }
      const query = [
        {
          $match: {
            status: "PAGO",
          },
        },
        {
          $project: {
            day: dayQuery,
            valorTotal: 1,
            pagoEm: 1,
            status: 1,
          },
        },
        {
          $group: {
            _id: { dia: "$day" },
            count: { $sum: "$valorTotal" },
            data: { $first: "$pagoEm" },
            status: { $first: "$status" },
          },
        },
        {
          $set: {
            cor: "#e32b3a",
            nome: "Pago",
          },
        },
        {
          $project: {
            count: 1,
            cor: 1,
            nome: 1,
            dataDesejada: "$data",
            dia: "$_id.dia",
            _id: 0,
          },
        },
      ];
      if (frequencia === "diario" || frequencia === "mensal") {
        query.push({
          $set: {
            dia: { $subtract: ["$dia", 1] },
          },
        });
      }
      SolicitacaoProduto.aggregate(query, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        } else {
          return res.json(result);
        }
      });
    }
  });
});

SolicitacaoProduto.route("relatorio", (req, res, next) => {
  podeVerRelatorio(req.decoded._id).then((autorizado) => {
    if (!autorizado) {
      return res
        .status(403)
        .json({ errors: ["Você não possui acesso a dados de relatório"] });
    } else {
      let dias = [];
      let dayQuery;
      const { frequencia } = req.body;
      const date = new Date();
      let start;
      let end;
      let data1;
      let data2;
      switch (frequencia) {
        case "mes":
        default:
          data1 = dateFns.getMonth(new Date()) + 1;
          data2 = data1 - 1;
          start = dateFns.startOfYear(date);
          end = dateFns.endOfYear(date);
          dayQuery = { $month: "$pagoEm" };
          break;
        case "ano":
          data1 = dateFns.getYear(new Date()) - 1;
          data2 = data1 - 1;
          start = dateFns.startOfYear(dateFns.subYears(date, 1));
          end = dateFns.endOfYear(date);
          // dias = [nYear, nYear2]
          dayQuery = { $year: "$pagoEm" };
          break;
      }
      SolicitacaoProduto.aggregate(
        [
          {
            $project: {
              data: dayQuery,
              valorTotal: 1,
              usuario: 1,
              status: 1,
              pagoEm: 1,
            },
          },
          {
            $match: {
              status: "PAGO",
              // data: {$in: dias},
              pagoEm: {
                $gte: start,
                $lte: end,
              },
            },
          },
          {
            $lookup: {
              from: "users",
              let: { usuarioId: "$usuario" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        {
                          $eq: ["$_id", "$$usuarioId"],
                        },
                        {
                          $eq: ["$hierarquia", "SEMINARISTA"],
                        },
                      ],
                    },
                  },
                },
              ],
              as: "user",
            },
          },
          {
            $match: {
              user: { $not: { $size: 0 } },
            },
          },
          {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [{ $arrayElemAt: ["$user", 0] }, "$$ROOT"],
              },
            },
          },
          {
            $group: {
              _id: { data: "$data", usuario: "$usuario" },
              count: { $sum: "$valorTotal" },
              pagoEm: { $first: "$pagoEm" },
              name: { $first: "$name" },
            },
          },
          {
            $project: {
              porcentagem: {
                $multiply: [
                  {
                    $divide: ["$count", { $literal: metaVenda }],
                  },
                  100,
                ],
              },
              count: 1,
              name: 1,
              pagoEm: 1,
              data: "$_id.data",
              usuario: "$_id.usuario",
              _id: 0,
            },
          },
        ],
        (err, result) => {
          if (err) {
            console.log(err);
            return res.status(400).json(err);
          } else {
            return res.json({ result, data1, data2 });
          }
        }
      );
    }
  });
});

SolicitacaoProduto.route("solicitacoesOutrasRel", (req, res, next) => {
  podeVerRelatorio(req.decoded._id).then((autorizado) => {
    if (!autorizado) {
      return res
        .status(403)
        .json({ errors: ["Você não possui acesso a dados de relatório"] });
    } else {
      const filtroSolicitacao = [{ $eq: ["$_id", "$$solicitacaoId"] }];
      let dayQuery;
      const { frequencia, start, end } = req.body;
      if (!controleDeFrequenciaPeriodo(frequencia, start, end)) {
        return res.status(400).json({
          errors: ["Frequência não está de acordo com o período selecinado"],
        });
      }
      filtroSolicitacao.push({ $gte: ["$dataDesejada", new Date(start)] });
      filtroSolicitacao.push({ $lte: ["$dataDesejada", new Date(end)] });
      switch (frequencia) {
        case "diario":
          dayQuery = { $dayOfWeek: "$dataDesejada" };
          break;
        case "semanal":
        default:
          dayQuery = { $dayOfMonth: "$dataDesejada" };
          break;
        case "mensal":
          dayQuery = { $month: "$dataDesejada" };
          break;
        case "anual":
          dayQuery = { $year: "$dataDesejada" };
          break;
      }
      const query = [
        {
          $match: {
            status: {
              $ne: "PAGO",
            },
          },
        },
        {
          $project: {
            day: dayQuery,
            valorTotal: 1,
            pagoEm: 1,
            status: 1,
          },
        },
        {
          $group: {
            _id: { dia: "$day", status: "$status" },
            count: { $sum: "$valorTotal" },
            dataDesejada: { $first: "$dataDesejada" },
          },
        },
        {
          $project: {
            count: 1,
            nome: "$_id.status",
            dataDesejada: 1,
            dia: "$_id.dia",
            produtoId: "$_id.status",
            _id: 0,
          },
        },
      ];
      if (frequencia === "diario" || frequencia === "mensal") {
        query.push({
          $set: {
            dia: { $subtract: ["$dia", 1] },
          },
        });
      }
      SolicitacaoProduto.aggregate(query, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json(err);
        } else {
          return res.json(result);
        }
      });
    }
  });
});

const controleDeFrequenciaPeriodo = (frequencia, start, end) => {
  if (start && end) {
    const days2 = dateFns.differenceInDays(new Date(end), new Date(start));
    if (days2 < 15) {
      return frequencia === "diario";
    } else if (days2 < 60) {
      return frequencia === "semanal";
    } else if (days2 > 60 && days2 < 366) {
      return frequencia === "mensal";
    } else if (days2 > 366) {
      return frequencia === "anual";
    }
  }
  return null;
};

async function podeVerRelatorio(id) {
  const usr = await User.findById(id)
    .populate({
      path: "cargo",
      populate: {
        path: "permissoes",
      },
    })
    .populate("equipe")
    .exec();
  if (
    usr.hierarquia === "REITOR" ||
    usr.hierarquia === "CONSELHO_GESTOR" ||
    (usr.hierarquia === "SEMINARISTA" &&
      usr.equipe &&
      usr.equipe.role === "PRODUTO" &&
      (usr.coordenaEquipe ||
        (usr.cargo &&
          (usr.cargo.permissoes || []).some(
            (it) => it.nome === "VER_RELATORIO"
          ))))
  ) {
    return true;
  } else {
    return false;
  }
}

module.exports = SolicitacaoProduto;
