
const enviarEmail = (email) => {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_KEY); // key
  const {subject, text, html} = email;
  // email fixado para n sair enviando email pras pessoas na fase de teste
  const to = process.env.prod ? email.to || 'tayergustavo@gmail.com' : 'tayergustavo@gmail.com'
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
