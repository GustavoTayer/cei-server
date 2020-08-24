const DateFns = require("date-fns");
const multer = require('multer');
const Partilha = require("./partilhaSolidaria");
const errorHandler = require("../common/errorHandler");
const User = require("../user/user");
const Caixa = require("../caixa/caixa");
const Count = require("../count/count");
const uuid = require('uuid')
const path = require('path')
const PartilhaAdiantamento = require("../partilha_adiantamento/partilhaAdiantamento");
const Movimentacao = require("../partilha_movimentacao/partilhaMovimentacao");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
Partilha.methods([]);
Partilha.updateOptions({ new: true, runValidators: true });
Partilha.after("post", errorHandler).after("put", errorHandler);
var DIR = 'uploads/partilha';



Partilha.route("count", (req, res, next) => {
  Partilha.count((error, value) => {
    if (error) {
      res.status(500).json({ errors: [error] });
    } else {
      res.json({ value });
    }
  });
});

Partilha.route("buscarPorId", (req, res, next) => {
  Partilha.findById(req.body.id, {_id: 1, ano: 1, valorComprovante: 1, status: 1, justificativaAtraso: 1, mes: 1, justicativaCorrecao: 1, file: 1}, (err, partilha) => {
    if(err) {
      return sendErro(res, err)
    }
    if(partilha.status !== 'CORRECAO' && partilha.status !== 'EM_ANALISE') {
      return sendErro(res, 'Só pode editar se o status for Solicitado Correção ou Em Análise')
    }
    return res.json(partilha)
  })
})

const editarPartilha = async(req, res, next) => {
  const usuario = req.decoded._id;
  const partilhaDados = req.body;
  const partilha = await Partilha.findById(partilhaDados.id)

  if(!partilha) {
    return sendErro(res, 'Não encontrou partilha solidária com o id solicitado')
  }
  if(usuario !== partilha.usuario) {
    return sendErro(res, 'Você não pode alterar partilha de outro usuário')
  }

  if(partilha.status !== 'CORRECAO' && partilha.status !== 'EM_ANALISE') {
    return sendErro(res, 'Só pode editar se o status for Solicitado Correção ou Em Análise')
  }
  // coloca primeiro os valores antigos, sobrescreve os alterados e seta status para analise novamente.
  partilha = {
    ...partilha,
    ...partilhaDados,
    status: 'EM_ANALISE'
    }
  await partilha.save()
  return res.json({atualizado: 'ok'})
}

Partilha.route("editar", (req, res, next) => {
  editarPartilha(req,res,next)
});


Partilha.route("enviarDoc", (req, res, next) => {
  if(!req.query.comprovanteId) {
    return res.status(403).json({message: 'Id obrigatório'})
  }
  console.log(req.params)
  const filename = req.query.comprovanteId.replace('--', '')
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, DIR)
    },
    filename: function (req, file, cb) {
      cb(null, filename + '.' + file.originalname.split('.')[1])
    }
  })
  const upload = multer({storage: storage})
    .single('file');
  upload(req, res, function (err) {
    if (err) {
      return res.json({err:err.toString()});
    }
    console.log(req.query)
    Partilha.updateOne({'_id': filename }, {file: filename + '.' + req.file.originalname.split('.')[1]}, (err, suc) =>{
      if (err) {
        return res.json({err:err.toString()})
      }
      return res.json({ok:'File is uploaded'});
    })

  });
});

Partilha.route('obterDoc2', (req,res,next) => {
  const {file} = req.body
  // const file = req.params.tagId
  if(!file) {

  }
  try {
    return res.sendFile(
      file, {
        root: path.join(__dirname, '../../../uploads/partilha')
       });
  } catch(e) {
    return sendErro(res, 'Arquivo não encontrado')
  }
})


Partilha.route("criar", (req, res, next) => {
  const usuario = req.decoded._id;
  const partilhaDados = req.body;
  const dataPrevistaRecebimento = calculaDataPrevista(
    partilhaDados.mes,
    partilhaDados.ano
  );
  Partilha.findOne(
    { usuario, ano: partilhaDados.ano, mes: partilhaDados.mes },
    (err, partilha) => {
      if (partilha) {
        return res.status(400).json({
          errors: [
            "Você já possui um envio de comprovante para o mês solicitado",
          ],
        });
      } else if (err) {
        return res.status(400);
      } else {
        if(!partilhaDados.ano) {
          return sendErro(res, 'Ano é obrigatório')
        }

        if(!partilhaDados.mes) {
          return sendErro(res, 'Mês é obrigatório')
        }

        if(!partilhaDados.file) {
          return sendErro(res, 'Arquivo é obrigatório')
        }


        if(!partilhaDados.valorComprovante) {
          return sendErro(res, 'Valor do comprovante é obrigatório')
        }
        new Partilha({
          ...partilhaDados,
          dataPrevistaRecebimento,
          usuario,
        }).save((err, suc) => {
          if (err) {
            return res.status(400);
          } else {
            return res.json(suc);
          }
        });
      }
    }
  );
});

const alterarStatusComum = async (req, res, next) => {
  try {
    const usuarioLogado = await User.findById(req.decoded._id);
    const partilhas = await Partilha.find({
      _id: { $in: req.body.ids },
    }).populate("usuario");
    const caixa = await Caixa.findOne({ nome: "PARTILHA_SOLIDARIA" });
    const count = await Count.findOne({ nome: "PARTILHA_MOVIMENTACAO" });
    const ctp = count.count;
    return {
      partilhas,
      caixa: caixa.valor,
      count: ctp,
      usuarioLogado,
    };
  } catch (e) {
    console.log(e);
    sendErro(res, e);
  }
};

const alterarStatusCorrecao = async (req, res, next) => {
  try {
    const { ids, justificativa } = req.body;
    if (!justificativa) {
      return res.status(400).json({ errors: ["justificativa é obrigatório"] });
    }
    await Partilha.updateMany(
      {
        _id: { $in: ids },
      },
      {
        $set: {
          status: "CORRECAO",
          justicativaCorrecao: justificativa,
        },
        $addToSet: {
          atividades: [
            {
              descricao: justificativa,
              atividade: `${req.decoded.name} Solicitou correção`,
            },
          ],
        },
      }
    );
    return res.json("ok");
  } catch (e) {
    console.log(e);
    sendErro(res, e);
  }
};

const alterarStatusUpdates = async (res, baixas, count, caixa) => {
  try {
    await Movimentacao.insertMany(baixas);
    await Caixa.updateOne(
      { nome: "PARTILHA_SOLIDARIA" },
      {
        $set: {
          valor: caixa,
        },
      }
    );
    await Count.updateOne(
      { nome: "PARTILHA_MOVIMENTACAO" },
      {
        $set: {
          count,
        },
      }
    );
  } catch (e) {
    console.log(e);
    sendErro(res, e);
  }
};

const alterarStatusAprov = async (req, res, next) => {
  try {
    const { status, dataDeposito, ids } = req.body;
    const { partilhas, caixa, count, usuarioLogado } = await alterarStatusComum(
      req,
      res,
      next
    );

    let saldo = caixa;
    let ctp = count;
    const baixas = [];
    for (let i = 0; i < partilhas.length; i++) {
      ctp++;
      const partilha = partilhas[i];
      // Só pode alterar status se o usuário tiver uma paróquia
      if (!partilha.usuario.paroquia) {
        return sendErro(
          res,
          `Seminarista ${partilha.usuario.name} não possui paróquia registrada, portanto não é possível aprovar comprovante`
        );
      }

      // Status das partilhas precisam bater com o enviado na requisição
      console.log(partilha.status, status);
      if (partilha.status !== status) {
        return sendErro(
          res,
          "O Status enviado está diferente do status da partilha"
        );
      }

      // saldo no caixa
      saldo += partilha.valorComprovante;

      // movimentação da partilha
      baixas.push({
        saldo,
        data: dataDeposito,
        entrada: partilha.valorComprovante,
        atividade: partilha.usuario.paroquia,
        order: ctp,
      });
    }

    await Partilha.updateMany(
      {
        _id: { $in: ids },
      },
      {
        $set: {
          status: "APROVADO",
          dataAprovado: new Date(),
        },
        $addToSet: {
          atividades: [
            {
              descricao: `${usuarioLogado.name} aprovou comprovante`,
              atividade: "Aprovado",
            },
          ],
        },
      }
    );
    alterarStatusUpdates(res, baixas, ctp, saldo);

    return res.json("ok");
  } catch (e) {
    console.log(e);
    return sendErro(res, e);
  }
};

const alterarStatusDep = async (req, res, next) => {
  try {
    const { ids, valorDepositado, dataDeposito, status } = req.body;

    if (!dataDeposito) {
      return sendErro(res, "Data do depósito é obrigatório");
    }

    const partilhas = await Partilha.find({ _id: { $in: ids } }).populate(
      "usuario"
    );

    const usuarios = new Set();
    partilhas.forEach((p) => {
      usuarios.add(p.usuario);
    });
    const partilhasAdiantadas = await PartilhaAdiantamento.find({
      usuario: { $in: Array.from(usuarios) },
      descontado: false,
    });

    console.log(partilhasAdiantadas)
    const caixa = await Caixa.findOne({ nome: "PARTILHA_SOLIDARIA" });
    const count = await Count.findOne({ nome: "PARTILHA_MOVIMENTACAO" });
    const baixas = [];
    let ctp = count.count;
    let saldo = caixa.valor;
    for (let i = 0; i < partilhas.length; i++) {
      ctp++;
      const partilha = partilhas[i];
      let vd = valorDepositado;
      // Só pode alterar status se o usuário tiver uma paróquia
      if (!partilha.usuario.paroquia) {
        return res.status(400).json({
          errors: [
            `Seminarista ${partilha.usuario.name} não possui paróquia registrada, portanto não é possível aprovar comprovante`,
          ],
        });
      }

      // Status das partilhas precisam bater com o enviado na requisição
      if (partilha.status !== status) {
        return sendErro(
          "O Status enviado está diferente do status da partilha"
        );
      }
      (partilhasAdiantadas || []).forEach((pa) => {
        console.log(pa.usuario , partilha.usuario._id)
        if (pa.usuario.toString() === partilha.usuario._id.toString()) {
          vd -= pa.valor;
        }
      });
      vd += partilha.usuario.passagem || 0;
      partilha.status = "DEPOSITADO";
      partilha.valorDepositado = vd;
      partilha.dataDeposito = dataDeposito;
      saldo -= vd;
      // movimentação da partilha
      baixas.push({
        saldo,
        data: dataDeposito,
        saida: vd,
        atividade: "Doação seminarista",
        order: ctp,
      });
       await partilha.save();
      await PartilhaAdiantamento.updateMany({
        usuario: { $in: Array.from(usuarios) },
        descontado: false,
      }, { descontado: true })
    }
    alterarStatusUpdates(res, baixas, ctp, saldo);

    return res.json(partilhas);
  } catch (e) {
    console.log(e);
    sendErro(res, e);
  }
};

Partilha.route("alterar-status", (req, res, next) => {
  const { aprovado, status } = req.body;
  if (status === "EM_ANALISE") {
    if (aprovado) {
      alterarStatusAprov(req, res, next);
    } else {
      alterarStatusCorrecao(req, res, next);
    }
  } else if (status === "APROVADO") {
    alterarStatusDep(req, res, next);
  }
});

function sendErro(res, err) {
  return res.status(400).json({ errors: [err] });
}

const teste = async (req, res, next) => {
  // console.log('chegou')
  const teste = await Partilha.find();
  // console.log(teste)
  return res.json(teste);
};

Partilha.route("teste", (req, res, next) => {
  teste(req, res, next);
});

Partilha.route("lista", (req, res, next) => {
  const usuario = req.decoded._id;
  Partilha.find({ usuario,
     ano: DateFns.getYear(new Date())
  })
    .sort({ mes: -1 })
    .populate('usuario')
    .exec((err, comprovantes) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      } else {
        return res.json(comprovantes);
      }
    });
});

Partilha.route("valoresGestao", (req, res, next) => {
  valoresGestao(req, res, next);
});

Partilha.route("gerarRelatorio", (req, res, next) => {
  Caixa.find({ nome: "PARTILHA_SOLIDARIA" }, (err, caixa) => {
    csvWriter = createCsvWriter({
      path: "./teste.csv",
      header: [
        {
          id: "name",
          title: "NAME",
          id: "lang",
          title: "LANGUAGE",
        },
      ],
    });
    const records = [
      { name: "Bob", lang: "French, English" },
      { name: "Mary", lang: "English" },
    ];
    csvWriter
      .writeRecords(records) // returns a promise
      .then((a) => {
        return res.json({});
      });
  });
});

function queryBuscarPartilhas(filtros) {
  const query = {};
  if (filtros) {
    if (filtros.status) {
      query["status"] = filtros.status;
    }
    if (filtros.mes) {
      query["mes"] = filtros.mes;
    }
    if (filtros.ano) {
      query["ano"] = filtros.ano;
    }
    if (filtros.usuario) {
      query["usuario"] = filtros.usuario;
    }
    if (filtros.dataPrevistaRecebimento) {
      const data = new Date(filtros.dataPrevistaRecebimento);
      query["dataPrevistaRecebimento"] = { $gte: data, $lte: data };
    }
  }
  return query;
}

const valoresGestao = async (req, res, next) => {
  const caixa = await Caixa.findOne({ nome: "PARTILHA_SOLIDARIA" });
  const seminaristas = await User.find({
    hierarquia: "SEMINARISTA",
    ativo: true,
  });
  const partilhas = await Partilha.find(
    queryBuscarPartilhas({ mes: req.body.mes, ano: req.body.ano })
  ).populate("usuario");
  const faltam = seminaristas.length - partilhas.length;
  let doado = 0;
  let depositado = 0;
  partilhas.forEach((it) => {
    doado += it.valorComprovante;
    if (it.valorDepositado) {
      depositado += it.valorDepositado;
    }
  });
  return res.json({
    caixa: caixa.valor,
    enviaram: partilhas.length,
    faltam,
    depositado,
    doado,
  });
};

Partilha.route("buscar", (req, res, next) => {
  // const usuario = req.decoded._id;
  Partilha.find(queryBuscarPartilhas(req.body))
    .sort({ mes: -1, criadoEm: -1 })
    .populate("usuario", "-password")
    .exec((err, comprovantes) => {
      if (err) {
        return res.status(400).json(err);
      } else {
        return res.json(comprovantes);
      }
    });
});

function calculaDataPrevista(mes, year) {
  const now = new Date();
  const janela1 = DateFns.endOfDay(DateFns.endOfMonth(new Date(year, mes, 1)));
  const janela2 = DateFns.endOfDay(
    DateFns.setDate(DateFns.addMonths(janela1, 1), 9)
  );
  if (DateFns.isBefore(now, janela1)) {
    return new Date(DateFns.getYear(now), mes + 1, 5);
  } else if (DateFns.isBefore(now, janela2)) {
    return new Date(DateFns.getYear(now), mes + 1, 10);
  } else {
    return new Date(DateFns.getYear(now), mes + 2, 5);
  }
}

module.exports = Partilha;
