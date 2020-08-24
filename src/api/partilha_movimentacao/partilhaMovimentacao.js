const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema;
const partilhaSolidaria = new mongoose.Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'User' },
    atividade: {type: String},
    data: {type: Date},
    entrada: {type: Number},
    saida: {type: Number},
    saldo: {type: Number},
    order: {type: Number},
})

module.exports = restful.model('PartilhaMovimentacao', partilhaSolidaria)
