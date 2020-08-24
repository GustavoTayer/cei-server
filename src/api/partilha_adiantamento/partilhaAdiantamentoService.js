const DateFns = require("date-fns");
const PartilhaAdiantamento = require("./partilhaAdiantamento");
const errorHandler = require("../common/errorHandler");
const User = require("../user/user");
const Caixa = require('../caixa/caixa')
PartilhaAdiantamento.methods([]);
PartilhaAdiantamento.updateOptions({ new: true, runValidators: true });
PartilhaAdiantamento.after("post", errorHandler).after("put", errorHandler);
function sendErro(res, err) {
  return res.status(400).json({ errors: [err] });
}
var mongoose = require("mongoose");

PartilhaAdiantamento.route("criar", (req, res, next) => {
  criar(req, res, next)
});

const criar = async (req, res, next) => {
  const { usuario, data, valor, justificativa } = req.body;

  if (!usuario) {
    return res.status(400).json({ errors: ["Campo usuário é obrigatório"] });
  }
  if (!data) {
    return res.status(400).json({ errors: ["Campo data é obrigatório"] });
  }
  if (!valor) {
    return res.status(400).json({ errors: ["Campo valor é obrigatório"] });
  } else if (valor <= 0) {
    return res
      .status(400)
      .json({ errors: ["Valor precisa ser maior do que zero"] });
  }
  if (!justificativa) {
    return res
      .status(400)
      .json({ errors: ["Campo justificativa é obrigatório"] });
  }
  const user = await User.findById(usuario)
  if (!user) {
    return res.status(400).json({ errors: ["Usuário não encontrado"] });
  }
   const adiantamento = new PartilhaAdiantamento({
      usuario,
      justificativa,
      valor,
      data,
      criadoPor: req.decoded._id,
    })
    await adiantamento.save()
    await Caixa.updateOne(
      { nome: "PARTILHA_SOLIDARIA" },
      {
          $inc: {
            valor: -valor,
          }
      }
    );
    return res.json(adiantamento)
}

PartilhaAdiantamento.route("lista", (req, res, next) => {
  const query = {};
  const { usuario, dataDe, dataAte } = req.body;

  if (dataDe || dataAte) {
    query["data"] = {};
    if (dataDe) {
      query["data"]["$gte"] = dataDe;
    }
    if (dataAte) {
      query["data"]["$lte"] = dataAte;
    }
  }

  PartilhaAdiantamento.find(query)
    .populate("usuario")
    .populate("criadoPor")
    .exec((err, pas) => {
      if(err) {
        sendErro(res, err)
      }
      let adiantamentos = pas;
      if (usuario) {
        const s = new RegExp(usuario, "i");
        adiantamentos = adiantamentos.filter((it) =>
          s.exec(it.usuario.name)
        );
      }
      return res.json(adiantamentos);
    });
});

module.exports = PartilhaAdiantamento;
