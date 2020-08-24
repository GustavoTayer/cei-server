const restful = require('node-restful')
const mongoose = restful.mongoose

const Schema = mongoose.Schema;

const equipeCargo = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: {type: String, required: false},
    ativo: {type: Boolean, default: true},
    permissoes: [{type: Schema.Types.ObjectId, ref: 'EquipePermissao'}],
    equipe: {type: Schema.Types.ObjectId, ref: 'Equipe'}
})

module.exports = restful.model('EquipeCargo', equipeCargo)
