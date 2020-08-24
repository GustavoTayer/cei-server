const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema;

const tarefa = new mongoose.Schema({
    criadoEm: {type: Date, default: Date.now},
    observacao: { type: String },
    dataDe: {type: Date, required: true},
    dataAte: {type: Date, required: true},
    usuarios: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, uppercase: true, default: 'ABERTO',
      enum: ['ABERTO', 'CONCLUIDO'] },
    tipo: { type: Schema.Types.ObjectId, ref: 'User' },
    tipoCustom: {type: String}
})

module.exports = restful.model('Tarefas', tarefa)
