const nodemailer = require("nodemailer");

// send email using nodemailer
const sendEmail = async (options) => {
  const { email, subject, message } = options;
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // send mail with defined transport object
  const msg = {
    from: 'dustin.demo@test.com',
    to: email,
    subject: subject,
    text: message,

  };
  await transporter.sendMail(message);
};

module.exports = sendEmail;
