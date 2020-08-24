const SolicitacaoProduto = require('./solicitacao-produto')
const Produto = require('../produto/produto')
const errorHandler = require('../common/errorHandler')

SolicitacaoProduto.methods(['get', 'post', 'put'])
SolicitacaoProduto.updateOptions({new: true, runValidators: true})
SolicitacaoProduto.after('post', errorHandler).after('put', errorHandler)
var mongoose = require('mongoose');
SolicitacaoProduto.route('count', (req, res, next) => {
  // Produto.find({}, {_id: 1}, (error, result) => {
  //   result.forEach(prod => {

  //   })
  // })
  SolicitacaoProduto.aggregate([
    {
      $project: {
        teste: {
          $filter: {
             input: "$produtos",
             as: "produto",
             cond: {$eq: ["$$produto.produto", mongoose.Types.ObjectId('5e863d2216122e33a09df8e2')]}
          }
        },
        produtos: 1
      }
  },
  {
    $project: {
      soma: {$sum: '$teste.quantidade'}, produtos: 1
    }
  }, {
    $group: {_id: null, total: {$sum: "$soma"}, produtos: {
      $push: '$produtos'
    }}
  }, {
    $project: {
      _id: 0, total: 1, prodId: '5e863d2216122e33a09df8e2', produtos: 1
    }
  }
]
  ).exec((err, solicitacoes) => {
    if(err) {
      return handleError(error);
    } else {
      return res.json(solicitacoes)
    }
  })
})

SolicitacaoProduto.route('buscar', (req, res, next) => {
  const usuario = req.decoded._id
  const filtro = req.body.filtro;
  const query = {usuario};

  if(filtro.status) {
    query['status'] = filtro.status
  }

  if(filtro.dataDesejada) {
    query['dataDesejada'] = {
      '$gte': filtro.dataDesejada.start,
      '$lte': filtro.dataDesejada.end
    }
  }

  if(filtro.dataCriacao) {
    query['criadoEm'] = {
      '$gte': filtro.dataCriacao.start,
      '$lte': filtro.dataCriacao.end
    }
  }

  SolicitacaoProduto.find(query).populate('usuario').populate('produtos.produto').sort({status: -1, criadoEm: -1}).exec((err, solicitacoes) => {
    if(err) {
      return handleError(error);
    } else {
      return res.json(solicitacoes)
    }
  })
})

SolicitacaoProduto.route('salvar',  (req, res, next) => {
  const usuario = req.decoded._id
  const produtosSolicitados = req.body.produtos;
  let valorTotal = 0;
  Produto.find({}).then(p => {
    const prodSolValor = produtosSolicitados.map(ps => {
      const prr = p.find(prod => prod._id == ps.produto)
      const valor = prr.valor * ps.quantidade
      valorTotal += valor
      return {
       ...ps,
       valor,
      }
    })
    const sp = new SolicitacaoProduto({
      produtos: prodSolValor,
      dataDesejada: req.body.dataDesejada,
      usuario,
      valorTotal
    })
    sp.save((err, solProd) => {
      if(err) {
        return sendErrorsFromDB(res, err)
      } else {
        return res.json(solProd)
      }
    })
  })
})


module.exports = SolicitacaoProduto
