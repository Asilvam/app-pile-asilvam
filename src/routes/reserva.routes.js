const express = require("express");
const router = express.Router();
const correo = require("../services/correo");
const funciones = require("../services/funciones");
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

// Registro Model
const Reserva = require("../models/reserva");

// GET all Registros
router.get("/", async (req, res) => {
  let fechaHoy = moment().format(momentFormat1);
  fechaHoy = fechaHoy + "Z";
  let fechaMan = moment().add(1, "day").format(momentFormat1);
  fechaMan = fechaMan + "Z";
  const reservas = await Reserva.find({
    $and: [
      { fecha: { $gte: new Date(fechaHoy) } },
      { fecha: { $lte: new Date(fechaMan) } },
    ],
  }).sort({fechaST:1, hora:1});
  res.json(reservas);
});

// GET one Registro
router.get("/:id", async (req, res) => {
  const reserva = await Reserva.findById(req.params.id);
  res.json(reserva);
});

// ADD a new Registro
router.post("/", async (req, res) => {
  const { email, nombre, fecha, hora, depto, numero, celular,fechaST } = req.body;
  const valida = await funciones.valida_cupo(req.body, false, "");
  if (!valida.res) {
    res.json({
      status: "Reserva RECHAZADA",
      motivo: valida.message,
    });
  } else {
    const reserva = new Reserva({
      email,
      nombre,
      fecha,
      hora,
      depto,
      numero,
      celular,
      fechaST
    });
    console.log(req.body);
    await reserva.save();
    const response = await correo.enviarcorreo(req.body, false);
    res.json({ status: "Reserva Generada" });
  }
});

// UPDATE a new Registro -- SIN   USO  <--------------------------------
router.put("/:id", async (req, res) => {
  const { email, nombre, fecha, hora, depto, numero, celular } = req.body;
  const newReserva = {
    email,
    nombre,
    fecha,
    hora,
    depto,
    numero,
    celular,
  };

  await Reserva.findByIdAndUpdate(req.params.id, newReserva);
  res.json({ status: "Reserva Actualizada" });
});

// DELETE a Registro
router.delete("/:id", async (req, res) => {
  const reserva = await Reserva.findById(req.params.id);
  await Reserva.findByIdAndRemove(req.params.id);
  console.log(reserva._doc);
  res.json({ status: "Reserva Eliminada" });
});

module.exports = router;
