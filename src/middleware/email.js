const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.USER, 
        pass: process.env.PASSWORD, 
        host: process.env.HOST,
        port: process.env.PORT,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let info = await transporter.sendMail({
      from: "El Seba",
      to: email,
      subject: "Send from nodemeiler",
      text: `Welcome ${name} to the best website of movies`,
    });

    console.log(info);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
