const express = require("express");
const logger = require("../logger");
const router = express.Router();
const correo = require('../services/correo');

// Registro Model
const Reserva = require("../models/reserva");

// GET all Registros
router.get("/", async (req, res) => {
  const reservas = await Reserva.find();
  res.json(reservas);
});

// GET one Registro
router.get("/:id", async (req, res) => {
  const reserva = await Reserva.findById(req.params.id);
  res.json(reserva);
});

// ADD a new Registro
router.post("/", async (req, res) => {
  const {
    email, nombre, fecha, hora, depto, numero,celular,
  } = req.body;
  const reserva = new Reserva({
    email, nombre, fecha, hora, depto, numero,celular,
  });
  logger.log('info',req.body);
  await reserva.save();
  const response= await correo.enviarcorreo(req.body, '');
  res.json({ status: "Reserva Generada" });
});

// UPDATE a new Registro
router.put("/:id", async (req, res) => {
  const {
    email, nombre, fecha, hora, depto, numero,celular,
  } = req.body;
  const newReserva = {
    email, nombre, fecha, hora, depto, numero,celular,
  };
  logger.log("info",req.body);
  await Reserva.findByIdAndUpdate(req.params.id, newReserva);
  res.json({ status: "Reserva Actualizada" });
});

// DELETE a Registro
router.delete("/:id", async (req, res) => {
  await Reserva.findByIdAndRemove(req.params.id);
  res.json({ status: "Reserva Eliminada" });
});

module.exports = router;
