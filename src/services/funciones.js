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
const deptos = [
  "201",
  "202",
  "203",
  "204",
  "205",
  "206",
  "207",
  "208",
  "301",
  "302",
  "303",
  "304",
  "305",
  "306",
  "307",
  "308",
  "401",
  "402",
  "403",
  "404",
  "405",
  "406",
  "407",
  "408",
  "501",
  "502",
  "503",
  "504",
  "505",
  "506",
  "507",
  "508",
  "601",
  "602",
  "603",
  "604",
  "605",
  "606",
  "607",
  "608",
  "701",
  "702",
  "703",
  "704",
  "705",
  "706",
  "707",
  "708",
  "801",
  "802",
  "803",
  "804",
  "805",
  "806",
  "807",
  "808",
  "901",
  "902",
  "903",
  "904",
  "905",
  "906",
  "907",
  "908",
  "1001",
  "1002",
  "1003",
  "1004",
  "1005",
  "1006",
  "1007",
  "1008",
  "1101",
  "1102",
  "1103",
  "1104",
  "1105",
  "1106",
  "1107",
  "1108",
  "1201",
  "1202",
  "1203",
  "1204",
  "1205",
  "1206",
  "1207",
  "1208",
  "1301",
  "1302",
  "1303",
  "1304",
  "1305",
  "1306",
  "1307",
  "1308",
  "1401",
  "1402",
  "1403",
  "1404",
  "1405",
  "1406",
  "1407",
  "1408",
];
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
    let fecha = new Date(fechaSol);
    console.log(moment().format('DD-MM-yyyy, hh:mm:ss a'), ' ', req.depto,' ', req.nombre, ' ', req.fecha, ' ', req.hora,' ',req.numero);
    //console.log(deptos.indexOf(req.depto));
    if (!(deptos.indexOf(req.depto) >= 0)) {
      return {
        res: false,
        message: "Depto No Existe",
      };
    }
    //console.log(horas.indexOf(req.hora));
    if (!(horas.indexOf(req.hora) >= 0)) {
      return {
        res: false,
        message: "Hora No es valida",
      };
    }
    //console.log(nopersonas.indexOf(req.numero));
    if (!(nopersonas.indexOf(req.numero) >= 0)) {
      return {
        res: false,
        message: "Nº personas No es valida",
      };
    }
    if (fechaMan != fechaSol && fechaHoy != fechaSol) {
      return {
        res: false,
        message: "La fecha No es valida",
      };
    }
    //console.log(fecha.getDay());
    // == 0 Domingo en ingles
    if (fecha.getDay() == 0) {
      return {
        res: false,
        message: "Lunes Cerrado",
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
    //console.log(cupos);
    let total = 0;
    cupos.map((cupo) => (total += cupo.numero));
    //console.log(total);
    numcupos = parseInt(req.numero);
    if (4 - total === 0) {
      return {
        res: false,
        message: "No Hay Cupos",
      };
    } else {
      if (!(4 - total >= numcupos)) {
        return {
          res: false,
          message: "Cupos insuficientes",
        };
      }
    }
    return { res: true };
  },
};
