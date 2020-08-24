const ProdutoSolicitado = require('./produto-solicitado')
const errorHandler = require('../common/errorHandler')
const moment = require('moment')
ProdutoSolicitado.methods([])
ProdutoSolicitado.updateOptions({new: true, runValidators: true})
ProdutoSolicitado.after('post', errorHandler).after('put', errorHandler)
var mongoose = require('mongoose');
const dateFns = require('date-fns')

ProdutoSolicitado.route('count', (req, res, next) => {
  const filtroSolicitacao = [{$eq: ['$_id', '$$solicitacaoId']}]
  const filtro = req.body.filtro;
  if(filtro) {
    if(filtro.status) {
      filtroSolicitacao.push({$eq: ['$status', filtro.status]} )
    }

    if(filtro.usuario) {
      filtroSolicitacao.push({$eq: ['$usuario',  mongoose.Types.ObjectId(filtro.usuario)]})
    }

    if(filtro.dataDesejada) {
      if(filtro.dataDesejada.start) {
        filtroSolicitacao.push({$gte: ['$dataDesejada', new Date(filtro.dataDesejada.start)]})
      }
      if(filtro.dataDesejada.end) {
        filtroSolicitacao.push({$lte: ['$dataDesejada', new Date(filtro.dataDesejada.end)]})
      }
    }

    if(filtro.dataCriacao) {
      if(filtro.dataCriacao.start) {
        filtroSolicitacao.push({$gte: ['$criadoEm', new Date(filtro.dataCriacao.start)]})
      }
      if(filtro.dataCriacao.end) {
        filtroSolicitacao.push({$lte: ['$criadoEm', new Date(filtro.dataCriacao.end)]})
      }
    }
  }

  ProdutoSolicitado.aggregate([
    {
      $lookup: {
        from: 'solicitacaoprodutos',
        let: { solicitacaoId: '$solicitacao'},
        pipeline: [
          {
            $match: {
              $expr: {
                $and: filtroSolicitacao
              }
            }
          }
        ],
        as: "score"
      }
    }, {
      $match: {
        score: {$not: {$size: 0}}
      }
    },
    {
      $group: {
        _id: '$produto',
        count: {$sum: '$quantidade'}
      }
    },
    {
      $lookup: {
         from: "produtos",
         localField: "_id",    // field in the orders collection
         foreignField: "_id",  // field in the items collection
         as: "produto"
      }
    }
    ], (err, produtos) => {
      if(err) {
        return res.status(500).json({errors: [err]})
      }
      res.json(produtos)
    })
})


ProdutoSolicitado.route('relProd', (req, res, next) => {
  const filtroSolicitacao= [{$eq: ['$_id', '$$solicitacaoId']}]
  let dayQuery;
  const {frequencia, start, end} = req.body;
  if(!controleDeFrequenciaPeriodo(frequencia, start, end)) {
    return res.status(400).json({errors: ['Frequência não está de acordo com o período selecinado']})
  }
    filtroSolicitacao.push({$gte: ['$pagoEm', new Date(start)]})
    filtroSolicitacao.push({$lte: ['$pagoEm', new Date(end)]})
    filtroSolicitacao.push({$eq: ['$status', 'PAGO']})
    switch(frequencia) {
      case 'diario':
        dayQuery = {$dayOfWeek: '$pagoEm'}
        break;
      case 'semanal':
      default:
        dayQuery = {$dayOfMonth: '$pagoEm'}
        break;
      case 'mensal':
        dayQuery = {$month: '$pagoEm'}
        break;
      case 'anual':
        dayQuery = {$year: '$pagoEm'}
        break;

  }
  const query = [
    {
      $lookup: {
        from: 'solicitacaoprodutos',
        let: { solicitacaoId: '$solicitacao'},
        pipeline: [
          {
            $match: {
              $expr: {
                $and: filtroSolicitacao
              }
            }
          }
        ],
        as: "solicitacao"
      }
    },
    {
      $match: {
        solicitacao: {$not: {$size: 0}}
      }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$solicitacao", 0 ] }, "$$ROOT" ] } }
    },
    {
      $project: {
        day: dayQuery,
        quantidade: 1,
        produto: 1,
        pagoEm: 1
      }
    },
    {
      $group: {
        _id: {produto: '$produto', dia: '$day'},
        count: {$sum: '$quantidade'},
        dataDesejada : {$first: '$pagoEm'}
      }
    },
    {
      $lookup: {
         from: "produtos",
         localField: "_id.produto",    // field in the orders collection
         foreignField: "_id",  // field in the items collection
         as: "produto"
      }
    },
    {
      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$produto", 0 ] }, "$$ROOT" ] } }
    },
    {
      $project: {
        cor: 1,
        count: 1,
        nome: 1,
        dataDesejada: 1,
        produtoId: '$_id.produto',
        dia: '$_id.dia',
        _id: 0
      }
    }]
    if(frequencia === 'diario' || frequencia ===  'mensal') {
      query.push({
        $set: {
          dia: {$subtract: ['$dia', 1]}
        }
      })
    }

  ProdutoSolicitado.aggregate(query).exec((err, produtos) => {
      if(err) {
        console.log(err)
        return res.status(500).json({errors: [err]})
      }
      res.json(produtos)
    })
})

const controleDeFrequenciaPeriodo = (frequencia, start, end) => {
    if (start && end) {
      const days2 = dateFns.differenceInDays(new Date(end), new Date(start))
      if (days2 < 15) {
        return frequencia === 'diario';
      } else if (days2 < 60) {
        return frequencia ===  'semanal';
      } else if (days2 > 60 && days2 < 366) {
        return frequencia ===  'mensal';
      } else if (days2 > 366) {
        return frequencia === 'anual';
      }
    }
    return null;
}

module.exports = ProdutoSolicitado
