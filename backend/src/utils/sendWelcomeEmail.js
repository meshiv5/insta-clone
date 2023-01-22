const nodemailer = require("nodemailer");

function sendWelcomeEmail(email, name) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: "Instagram-Clone <000done9@gmail.com>",
    to: `${name} <${email}>`,
    subject: "Welcome To Instagram-Clone",
    text: `Hey ${name} You Just Signed Up On Instagram-Clone App`,
  };
  return transporter.sendMail(mailOptions);
}
module.exports = sendWelcomeEmail;
