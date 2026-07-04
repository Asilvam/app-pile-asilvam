const nodemailer = require("nodemailer");
const moment = require("moment");

module.exports = {
    enviarcorreo: async (req, res, opcion, message) => {
        try {
            const mailHost = process.env.MAIL_HOST || "smtp.gmail.com";
            const mailPort = Number(process.env.MAIL_PORT || 465);
            const mailSecure = String(process.env.MAIL_SECURE || "true").toLowerCase() === "true";
            const mailUser = process.env.MAIL_USER || process.env.USERGMAIL;
            const mailPassword = process.env.MAIL_PASSWORD || process.env.PASS;
            const mailFromName = process.env.MAIL_FROM_NAME || "Piscina JDC 1550";
            const mailFrom = process.env.MAIL_FROM || mailUser;
            const missingMailVars = [];
            if (!mailHost) missingMailVars.push("MAIL_HOST");
            if (!mailUser) missingMailVars.push("MAIL_USER");
            if (!mailPassword) missingMailVars.push("MAIL_PASSWORD");
            if (!mailFrom) missingMailVars.push("MAIL_FROM");
            if (missingMailVars.length > 0) {
                console.warn("[correo] Variables SMTP faltantes: " + missingMailVars.join(", "));
            }
            console.log("[correo] Preparando envio opcion=" + opcion + " host=" + mailHost + " port=" + mailPort + " secure=" + mailSecure + " user=" + (mailUser || "<sin usuario>") + " from=" + mailFromName + " <" + (mailFrom || "sin remitente") + "> to=" + req.email);
            moment.locale("es");
            let fechaST = moment(req.fecha).add(3, "hour").format("DD [de] MMMM");
            let fecha = moment(req.fecha).format("DD [de] MMMM");
            let transporter = nodemailer.createTransport({
                host: mailHost,
                port: mailPort,
                secure: mailSecure,
                auth: {
                    user: mailUser,
                    pass: mailPassword,
                },
                connectionTimeout: Number(process.env.MAIL_CONNECTION_TIMEOUT || 10000),
                greetingTimeout: Number(process.env.MAIL_GREETING_TIMEOUT || 10000),
                socketTimeout: Number(process.env.MAIL_SOCKET_TIMEOUT || 20000),
            });
            // send mail with defined transport object
            let textoReserva = `<span> Hola  ${req.nombre},<br> <br>Este Correo confirma tu reserva. <br> 
    Para el dia ${fecha}, desde las ${(req.horaST)} horas.<br>
    Es para ${req.numero} persona(s).<br>
    <br>
    Antes de hacer ingreso al área de la piscina, debes tomarte la temperatura con un termómetro infrarrojo disponible en conserjería. <br>
    De salir la temperatura sobre lo normal, se te negará la entrada a la piscina, invitando a que te realices un examen de PCR. <br>
    En caso de no hacerlo por cualquier razón, el conserje está facultado para pedirte que abandones la piscina. <strong>¡No vayas a olvidarlo! </strong> <br>
    <br>
    Recuerda que: <br>
    La mantención de la piscina en temporada alta es de 2 veces por semana, por este motivo está cerrada todo el día lunes y la mañana del jueves hasta las 15:00 hrs.<br>
    Para mantener la piscina en funcionamiento necesitamos que tod@s sigan las normas.<br>
    <br>
    Protocolo piscina por covid-19:<br>
    Aforo<br>
    <li>En el área piscina, se permitirán sólo 15 (quince) personas dentro del recinto, quiere decir dentro del perímetro de la reja.</li>
    <br>
    Medidas especiales:<br>
    <li>Queda prohibido el ingreso de visitas al sector de la piscina.</li>
    <li>No se puede hacer uso de reposeras, ni de juguetes inflables al interior o exterior de la piscina.</li>
    <li>Quienes estén con sus trajes de baño, deberán utilizar en todo momento su mascarilla, y solo sacarla cuando ingresen a la piscina.</li>
    <li>En la entrada de la piscina, mantendremos un depósito de alcohol gel, el cual será de uso obligatorio.</li>
    <li>La piscina se mantendrá operativa siempre que tod@s cooperen y cumplan con las indicaciones.</li> 
    <br>Hay que recordar que la pandemia no ha terminado y debemos continuar con los cuidados recomendados.<br>
    <br>
    Horario de funcionamiento:<br>
    <br>
    <li>Lunes		- Cerrado todo el día por mantención</li> 
    <li>Martes	- 10:00 a 20:00</li>
    <li>Miércoles	- 10:00 a 20:00</li>
    <li>Jueves	- Cerrado hasta las 15:00 horas por mantención</li>
    <li>Viernes	- 10:00 a 20:00</li> 
    <li>Sábado	- 10:00 a 20:00</li> 
    <li>Domingo	- 10:00 a 20:00</li>
    <br>
    Saludos, <br>
    Comunidad Edificio José Domingo Cañas 1550<br>
    <br>
    Nota: Este es un correo de respuesta automática, por lo tanto no contestes ni envíes correos a esta dirección de email.
    <span>`;
            let subjectReserva = "Reserva de Piscina ✔";
            let textoElimina = `<span> Hola  ${req.nombre},<br> <br> Tu Reserva para el dia  ${fechaST} <br>
      Ha sido Eliminada con Exito.<br>
      <br>
      Saludos, <br>
      Comunidad Edificio José Domingo Cañas 1550<br>
      <br>
      Nota: Este es un correo de respuesta automática, por lo tanto no contestes ni envíes correos a esta dirección de email.
      </span>`;
            let subjectElimina = "Anulacion de Reserva";
            let textoHtml = "";
            let subject = "";
            if (opcion === 0) {
                textoHtml = textoReserva;
                subject = subjectReserva;
            } else {
                textoHtml = textoElimina;
                subject = subjectElimina;
            }
            console.log("[correo] Ejecutando sendMail...");
            let info = await transporter.sendMail({
                from: "\"" + mailFromName + "\" <" + mailFrom + ">", // sender address
                to: req.email, // list of receivers
                subject: subject, // Subject line
                html: textoHtml, // html body
            });
            console.log("[correo] Envio OK to=" + req.email + " messageId=" + (info.messageId || "sin-message-id") + " response=" + (info.response || "sin-response"));
            if (opcion === 0) {
                console.log("Correo confirmacion enviado a: " + req.email);
            } else {
                console.log("Correo anulacion enviado a: " + req.email);
            }
            return {res: true};
        } catch (e) {
            console.error("[correo] Error enviando correo: message=" + e.message + " code=" + (e.code || "sin-code") + " responseCode=" + (e.responseCode || "sin-response-code") + " command=" + (e.command || "sin-command"));
            if (e.response) {
                console.error("[correo] SMTP response: " + e.response);
            }
            return {
                res: false,
                message: e.message,
            };
        }
    },
};
