const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (options) => {
  const mailToSend = {
    from: {
      name: process.env.SENDER_NAME || 'Trainer',
      email: process.env.SENDER_EMAIL
    },
    to: options.to,
    subject: options.subject,
    html: options.html
  }

  try {
    await sgMail.send(mailToSend)
  } catch (e) {
    console.log(mailToSend)
    console.log(e.response.body)
  }
}

module.exports = sendEmail
