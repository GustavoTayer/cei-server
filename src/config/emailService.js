const env = require('../.env')
const enviarEmail = (email) => {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey('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');
  const {subject, text, html} = email;
  // email fixado para n sair enviando email pras pessoas na fase de teste
  const to = env.prod ? email.to || 'tayergustavo@gmail.com' : 'tayergustavo@gmail.com'
  const msg = {
    to,
    from: 'tayergustavo@hotmail.com',
    subject,
    text,
    html
  };

  sgMail.send(msg).then(sss => sss).catch(err => console.log(err.response.body.errors));
}

module.exports = {enviarEmail}
