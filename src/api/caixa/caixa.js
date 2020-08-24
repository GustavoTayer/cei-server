const restful = require('node-restful')
const mongoose = restful.mongoose

const Schema = mongoose.Schema;

const caixa = new mongoose.Schema({
    nome: { type: String, required: true, uppercase: true,
        enum: ['PARTILHA_SOLIDARIA'] },
    valor: {type: Number, required: true},
    lastUpdate: {type: Date, default: Date.now}
})

module.exports = restful.model('Caixa', caixa)
