"use strict";
import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function main(message, subject, emailFrom) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: emailFrom, // sender address
    to: "contact@abiodunsamuel.com", // []
    subject: subject, // Subject line
    // text: "Hello world?", // plain text body
    html: `<div>${message}</div>`, // html body
  });
  return info;
}
// main().catch(console.error);
