const restful = require('node-restful')
const mongoose = restful.mongoose

const Schema = mongoose.Schema;

const count = new mongoose.Schema({
    nome: { type: String, required: true},
    count: {type: Number, default: 0},
    lastUpdate: {type: Date, default: Date.now}
})

module.exports = restful.model('Count', count)
