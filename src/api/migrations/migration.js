const restful = require('node-restful')
const mongoose = restful.mongoose

const equipe = new mongoose.Schema({
    nome: { type: String },
    descricao: {type: String},
    data: {type: Date, default: Date.now()}
})

module.exports = restful.model('Migrations', equipe)
