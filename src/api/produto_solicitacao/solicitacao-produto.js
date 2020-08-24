const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema;

// Quando algum produto sofrer alteração no preço, solicitações anteriores não podem sofrer alteração.
const produtosSolicitados = new mongoose.Schema({
  produto: { type: Schema.Types.ObjectId, ref: 'Produto', required: true },
  quantidade: {type: Number, required: true},
  valor: {type: Number, required: true}
})

const solicitacaoProduto = new mongoose.Schema({
    criadoEm: {type: Date, default: Date.now},
    valorTotal: { type: Number },
    dataDesejada: {type: Date, required: true},
    usuario: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, uppercase: true, default: 'ABERTO',
      enum: ['ABERTO', 'PRODUZINDO' ,'ENTREGUE', 'PAGO'] },
    produtos: [produtosSolicitados]
})

module.exports = restful.model('ProdutoSolicitacao', solicitacaoProduto)
