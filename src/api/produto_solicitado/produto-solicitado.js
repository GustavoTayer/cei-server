const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema;

// Quando algum produto sofrer alteração no preço, solicitações anteriores não podem sofrer alteração.
const produtosSolicitado = new mongoose.Schema({
  produto: { type: Schema.Types.ObjectId, ref: 'Produto', required: true },
  quantidade: {type: Number, required: true},
  valor: {type: Number, required: true},
  solicitacao: { type: Schema.Types.ObjectId, ref: 'SolicitacaoProduto' },
})

module.exports = restful.model('ProdutoSolicitado', produtosSolicitado)
