const nodemailer = require("nodemailer");

module.exports = {
  enviarcorreo: async (req, opcion) => {
    console.log(opcion);
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
    let textoReserva = `<b> Hola  ${req.nombre},<br> Este Correo confirma tu reserva. <br>
      Para el dia ${req.fecha}, desde las ${req.hora} horas.<br>
      Es para ${req.numero} personas.<br>
      <br>
      Recuerda las normas y protocolo de uso de la piscina. <br>
      <br>
      Se empático al reservar, no solo tú vives acá.<br>
      ¡¡¡ Todos queremos ir !!!!! <br>
      <br>
      Salu2, <br>
      Equipo "Pile JDC" </b>`;
    let subjectReserva = "Reserva de Piscina ✔";
    let textoElimina = `<b> Hola  ${req.nombre},<br> Tu Reserva para el dia  ${req.fechaST} <br>
      Ha sido Eliminada con Exito.<br>
      <br>
      Salu2, <br>
      Equipo "Pile JDC" </b>`;
    let subjectElimna = "Anulacion de Reserva";
    let textoHtml = "";
    let subject = "";
    if (opcion === 0) {
      textoHtml = textoReserva;
      subject = subjectReserva;
    } else {
      textoHtml = textoElimina;
      subject = subjectElimna;
    }
    let info = await transporter.sendMail({
      from: "Piscina JDC 1550", // sender address
      to: req.email, // list of receivers
      subject: subject, // Subject line
      html: textoHtml, // html body
    });
    console.log(`Correo enviado: ${req.email}`);
  },
};
