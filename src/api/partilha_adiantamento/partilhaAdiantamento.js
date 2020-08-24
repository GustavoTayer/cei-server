const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema;
const partilhaAdiantamento = new mongoose.Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'User'},
    criadoPor: { type: Schema.Types.ObjectId, ref: 'User'},
    data: {type: Date},
    justificativa: {type: String, required: true},
    valor: {type: Number, required: true},
    descontado: {type: Boolean, default: false},
    dataDescontado: {type: Date}
})

module.exports = restful.model('PartilhaAdiantamento', partilhaAdiantamento)
