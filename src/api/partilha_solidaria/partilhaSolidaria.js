const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema;

const atividades = new mongoose.Schema({
    atividade: {type: String, required: true},
    descricao: {type: String, required: true},
    criadoEm: {type: Date, default: Date.now},
})

const partilhaSolidaria = new mongoose.Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'User' },
    mes: { type: Number, min: 0, max: 12, required: true },
    ano: { type: Number, min: 1970, max: 2100, required: true },
    criadoEm: {type: Date, default: Date.now},
    valorComprovante: {type: Number, required: true},
    dataPrevistaRecebimento: {type: Date},
    status: {type: String, required: true, uppercase: true, default:'EM_ANALISE',
        enum: ['EM_ANALISE','CORRECAO', 'APROVADO','DEPOSITADO']},
    valorDepositado: {type: Number},
    dataAprovado: {type: Date},
    dataDepositado: {type: Date},
    justificativaAtraso: {type: String},
    atividades: [atividades],
    justicativaCorrecao: {type: String},
    file: {type: String}
})

module.exports = restful.model('PartilhaSolidaria', partilhaSolidaria)
