const restful = require('node-restful')
const mongoose = restful.mongoose

const Schema = mongoose.Schema;

const equipe = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: {type: String, required: false},
    ativo: {type: Boolean, default: true},
    membros: [{type: Schema.Types.ObjectId, ref: 'User'}],
    cargos: [{type: Schema.Types.ObjectId, ref: 'EquipeCargo'}],
    permissoes: [{type: Schema.Types.ObjectId, ref: 'EquipePermissao'}],
    role: {type: String}
})

module.exports = restful.model('Equipe', equipe)
