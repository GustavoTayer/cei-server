// import {v4 as uuidV4 } from 'uuid';
const _ = require('lodash');
const EmailService = require('../../config/emailService');
const UsuarioConvidado = require('./UsuarioConvidado');
const emailRegex = /\S+@\S+\.\S+/;
const User = require('../user/user')
const sendErrorsFromDB = (res, dbErrors) => {
    const errors = [];
    _.forIn(dbErrors.errors, error => errors.push(error.message));
    return res.status(400).json({errors})
};

const obterConvite = (req, res, next) => {
  const id = req.body.id
  if(!id) {
    return res.status(403).json({errors: ['Necessário enviar o id']})
  }
    UsuarioConvidado.findById(id, (err, convite) => {
      if(err) {
        return sendErrorsFromDB(res, err)
      } else {
        return res.json(convite)
      }
    })
}

const criarConvite = (req, res, next) => {
  const usuario = req.decoded._id
  User.findById(usuario, (err, usr) => {
    if(err) {
      return res.status(400).json(err)
    } else if(!usr.hierarquia === 'REITOR' && !usr.hierarquia === 'CONSEHO_GESTOR') {
      return res.status(403).json({errors: ['Você não tem permissão para fazer isso']})
    } else {
      const convites = req.body.convites
      console.log(convites)
      if(convites.find(it => !it.email.match(emailRegex))) {
        return res.status(400).send({errors: ['Existe algum email informado inválido']})
      }
      const emails = convites.map(it => it.email.toString());
        User.find({email : {$in: emails}}, (err, usuarios) => {
          if(err) {
            console.log(err)
            return res.status(400).json({errors: err});
          } else if(usuarios && usuarios.length) {
            return res.status(400).send({errors: [`Já existe usuário cadastrado para: ${usuarios.map(it => it.email)}`]})
          } else {
            UsuarioConvidado.insertMany(convites, (err, convites) => {
              if(err) {
                return sendErrorsFromDB(res, err)
              } else {
                convites.forEach(convite => {
                  const link = `http://localhost:4200/auth/register/${convite._id}`
                  EmailService.enviarEmail({
                    subject: 'Você recebeu um convite de registro para o Convivium Interno',
                    text: `Você foi convidado para fazer parte do nosso sistema interno do seminário, crie sua conta pelo link: ${link}`
                  })
                  return res.json({ok: true})
                })
              }
            })
          }
        })
    }
  })
};



module.exports = { criarConvite, obterConvite }
