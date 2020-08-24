const restful = require('node-restful')
const mongoose = restful.mongoose

const produto = new mongoose.Schema({
    nome: { type: String, required: true },
    valor: { type: Number, required: true },
    descricao: {type: String, required: false},
    ativo: {type: Boolean, default: true},
    cor: {type: String}
})

module.exports = restful.model('Produto', produto)
