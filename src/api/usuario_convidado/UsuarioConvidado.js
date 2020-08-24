const restful = require('node-restful')
const mongoose = restful.mongoose
const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    hierarquia: {type: String, uppercase: true, default: 'SEMINARISTA',
      enum: ['SEMINARISTA', 'FORMADOR', 'REITOR', 'CONSELHO_GESTOR', 'OUTROS']},
    convite: {type: String}
});
module.exports = restful.model('UsuarioConvidado', userSchema)
