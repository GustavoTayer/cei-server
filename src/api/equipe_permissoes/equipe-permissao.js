const restful = require('node-restful')
const mongoose = restful.mongoose

const Schema = mongoose.Schema;

const equipePermissao = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: {type: String, required: false},
    ativo: {type: Boolean, default: true},
    equipe: {type: Schema.Types.ObjectId, ref: 'Equipe'},
})

module.exports = restful.model('EquipePermissao', equipePermissao)
