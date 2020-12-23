const moment = require("moment");
const moment2 = require("moment");
const moment3 = require("moment");
const moment4 = require("moment");
const moment5 = require("moment");
moment.defaultFormat = "DD/MM/YYYY";
moment2.defaultFormat = "YYYY/MM/DD";
moment3.defaultFormat = "YYYY-MM-DDT00:00:00";
moment4.defaultFormat = "YYYY-MM-DD";
moment5.defaultFormat = "PGCYYYYMMDDTHHMMSS";
const momentFormat1 = "YYYY-MM-DDT00:00:00.000";
const momentFormat2 = "DD/MM/YYYY";
const momentFormat3 = "YYYY-MM-DD";
const Reserva = require("../models/reserva");
const deptos = ["201", "202", "203", "204", "205", "206", "207", "208"];
const horas = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];
const nopersonas = ["1", "2", "3", "4"];

module.exports = {
  valida_cupo: async (req, res, message) => {
    let fechaHoy = moment().format(momentFormat1);
    fechaHoy = fechaHoy + "Z";
    let fechaMan = moment().add(1, "day").format(momentFormat1);
    fechaMan = fechaMan + "Z";
    let fechaSol = moment(req.fecha).format(momentFormat1);
    fechaSol = fechaSol + "Z";
    console.log(deptos.indexOf(req.depto));
    if (!(deptos.indexOf(req.depto) >= 0)) {
      return {
        res: false,
        message: "No Depto No Existe",
      };
    }
    console.log(horas.indexOf(req.hora));
    if (!(horas.indexOf(req.hora) >= 0)) {
      return {
        res: false,
        message: "Hora No Corresponde",
      };
    }
    console.log(nopersonas.indexOf(req.numero));
    if (!(nopersonas.indexOf(req.numero) >= 0)) {
      return {
        res: false,
        message: "No personas No Corresponde",
      };
    }
    if (fechaMan != fechaSol && fechaHoy != fechaSol) {
      return {
        res: false,
        message: "La fecha no es valida",
      };
    }
    const reservasHoy = await Reserva.find({
      $and: [{ fecha: fechaHoy }, { depto: req.depto }],
    });
    const reservasMan = await Reserva.find({
      $and: [{ fecha: fechaMan }, { depto: req.depto }],
    });

    if (reservasHoy.length > 0 && fechaHoy === fechaSol) {
      return {
        res: false,
        message: "Ya tiene reserva",
      };
    } else {
      if (reservasMan.length > 0 && fechaMan === fechaSol) {
        return {
          res: false,
          message: "Ya tiene reserva",
        };
      }
    }
    const cupos = await Reserva.find({
      $and: [{ fecha: fechaSol }, { hora: req.hora }],
    });
    console.log(cupos);
    return { res: true };
  },
};
