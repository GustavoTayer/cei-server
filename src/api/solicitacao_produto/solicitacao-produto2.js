const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema;

const solicitacaoProduto = new mongoose.Schema({
    criadoEm: {type: Date, default: Date.now},
    valorTotal: { type: Number },
    dataDesejada: {type: Date, required: true},
    pagoEm: {type: Date},
    usuario: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, uppercase: true, default: 'ABERTO',
      enum: ['ABERTO', 'PRODUZINDO' ,'ENTREGUE', 'PAGO', 'SLC_CANCELAMENTO', 'CANCELADO'] },
    produtos: [{type: Schema.Types.ObjectId, ref: 'ProdutoSolicitado'}]
})

module.exports = restful.model('SolicitacaoProduto', solicitacaoProduto)
