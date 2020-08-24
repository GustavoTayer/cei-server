const restful = require('node-restful')
const mongoose = restful.mongoose
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, min: 6, max: 12, required: true},
    bd: {type: Date, required: false},
    comunidade: { type: String, uppercase: true, default: 'PROPEDEUTICO',
      enum: ['PROPEDEUTICO', 'FILOSOFIA' ,'TEOLOGIA', 'TIROCINIO']},
    equipe: {type: Schema.Types.ObjectId, ref: 'Equipe'},
    cargo:  {type: Schema.Types.ObjectId, ref: 'EquipeCargo'},
    hierarquia: {type: String, uppercase: true, default: 'SEMINARISTA',
      enum: ['SEMINARISTA', 'FORMADOR', 'REITOR', 'CONSELHO_GESTOR', 'OUTROS']},
    ativo: {type: Boolean, default: true},
    coordenaEquipe: {type: Boolean, default: false},
    passagem: {type: Number, default: 0},
    paroquia: {type: String},
});
module.exports = restful.model('User', userSchema)
