const mongoose = require('mongoose')
const migration = require('./migration')
mongoose.Promise = global.Promise
// const url = 'mongodb://localhost/cnv'
const url = 'mongodb://gustavotayer:Pipoca_123@geonosis.mongodb.umbler.com:40744/cnv'
module.exports = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }, err => {
  console.log(err || 'Acesso realizado com sucesso')
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
