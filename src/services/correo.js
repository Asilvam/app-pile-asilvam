const nodemailer = require("nodemailer");
module.exports = {
  enviarcorreo: async (req, res) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.USER, // generated ethereal user
          pass: process.env.PASS, // generated ethereal password
        },
      });   
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: 'Piscina JDC 1550', // sender address
        to: req.email, // list of receivers
        subject: "Reserva de Piscina ✔", // Subject line
        html: `<b> Estimado  ${req.nombre}, Este Correo confirma tu reserva, para el dia ${req.fecha}, desde las ${req.hora} </b>`, // html body
      });
      res.json({ status: "Correo Enviado" });
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  },
};
