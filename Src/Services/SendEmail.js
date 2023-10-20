import nodemailer from "nodemailer";
async function sendEmail(to,subject,html){ 

const transporter = nodemailer.createTransport({
 service:'gmail',
  auth: {
    user: process.env.SENDEMAIL,
    pass: process.env.SENDPASS
  },
});


  const info = await transporter.sendMail({
    from: `"Upvote 👻" <${process.env.SENDEMAIL}>`, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  });
}

export default sendEmail;