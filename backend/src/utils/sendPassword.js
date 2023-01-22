const nodemailer = require("nodemailer");

function sendPassword(email, newPassword, name) {
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
    subject: "Your New InstaGram Clone App Password",
    text: `Your New Password in Instagram-Clone App For Email :- ${email} is ${newPassword}`,
  };
  return transporter.sendMail(mailOptions);
}
module.exports = sendPassword;
