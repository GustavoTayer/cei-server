const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema;

const tarefaTipo = new mongoose.Schema({
    criadoEm: {type: Date, default: Date.now},
    criadoPor: { type: Schema.Types.ObjectId, ref: 'User' },
    ativo: {type: Boolean, default: true},
    nome: {type: String, required: true},
    descricao: {type: String}

})

module.exports = restful.model('TarefaTipo', tarefaTipo)
