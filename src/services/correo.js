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
        from: "Piscina JDC 1550", // sender address
        to: req.email, // list of receivers
        subject: "Reserva de Piscina ✔", // Subject line
        html: `<b> Hola  ${req.nombre},<br> Este Correo confirma tu reserva. <br>
        Para el dia ${req.fecha}, desde las ${req.hora} horas.<br>
        <br>
        Recuerda las normas y protocolo de uso de la piscina. <br>
        <br>
        Se empatico al reservar, no solo tu vives aca.<br>
        ¡¡¡ Todos queremos ir !!!!! <br>
        Salu2, <br>
        Equipo "Pile JDC" </b>`, // html body
      });
      console.log(`Correo enviado: ${req.email}`);
      return { res: true };
    } catch (error) {
      return {
        res: false,
        message: error.message,
      };
    }
  },
};
