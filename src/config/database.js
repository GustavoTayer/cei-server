const mongoose = require('mongoose')
const migration = require('./migration')
mongoose.Promise = global.Promise
const url = process.env.DB || 'mongodb://localhost/cnv'
module.exports = mongoose.connect(process.env.DB , { useNewUrlParser: true, useUnifiedTopology: true }, err => {
  console.log(err || `Databa connected`)
  if(!err) {
    migration.mudancas()
  }
})

mongoose.Error.messages.general.required = "O campo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min =
    "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}'."
mongoose.Error.messages.Number.max =
    "O '{VALUE}' informado é maior que o limite máximo de '{MAX}'."
mongoose.Error.messages.String.enum =
    "'{VALUE}' não é válido para o atributo '{PATH}'."
