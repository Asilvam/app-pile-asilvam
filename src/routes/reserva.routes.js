const express = require("express");
const router = express.Router();
const correo = require("../services/correo");
const funciones = require("../services/funciones");
const moment = require("moment");

moment.defaultFormat = "DD/MM/YYYY";

const momentFormat1 = "YYYY-MM-DDT00:00:00.000";

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
            {fecha: {$gte: new Date(fechaHoy)}},
            {fecha: {$lte: new Date(fechaMan)}},
        ],
    }).sort({fechaST: 1, horaST: 1});
    res.json(reservas);
});

// GET one Registro
router.get("/:id", async (req, res) => {
    // const reserva = await Reserva.findById(req.params.id);
    const reserva = await Reserva.find({id: req.params.id});
    res.json(reserva);
});

// ADD a new Registro
router.post("/", async (req, res) => {
    const {
        email,
        nombre,
        depto,
        numero,
        celular,
        fechaST,
        horaST,
        created_at,
        id,
    } = req.body;
    const fecha = moment(req.body.fecha).format(momentFormat1) + 'Z';
    const hora = moment(req.body.hora).format("HH:mm");
    const valida = await funciones.valida_cupo(req.body, false, "");
    if (!valida.res) {
        console.log(`Reserva Rechazada por: ${valida.message}`);
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
            fechaST,
            horaST,
            created_at,
            id,
        });
        console.log("Reserva Generada con Exito");
        //console.log(req.body);
        await reserva.save();
        const CorreoEnviado = await correo.enviarcorreo(req.body, false, 0, "");
        if (!CorreoEnviado.res) {
            console.log("Error al enviar Correo: ", CorreoEnviado.message);
        }
        res.json({status: "Reserva Generada"});
    }
});

// UPDATE a new Registro -- SIN   USO  <--------------------------------
router.put("/:id", async (req, res) => {
    const {email, nombre, fecha, hora, depto, numero, celular} = req.body;
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
    res.json({status: "Reserva Actualizada"});
});

// DELETE a Registro
router.delete("/:id", async (req, res) => {
    const reserva = await Reserva.find({id: req.params.id});
    //console.log(reserva);
    //console.log(reserva[0]._id);

    const valida = await funciones.valida_borrar(reserva[0], false, "");
    if (!valida.res) {
        console.log(`Eliminacion Fallo por: ${valida.message}`);
        res.json({
            status: "Eliminacion Fallo",
            motivo: valida.message,
        });
    } else {
        await Reserva.findByIdAndRemove(reserva[0]._id);
        console.log("Reserva Eliminada con Exito ");
        //console.log(reserva[0]);
        const CorreoEnviado = await correo.enviarcorreo(reserva[0], false, 1, "");
        if (!CorreoEnviado.res) {
            console.log("Error al enviar Correo: ", CorreoEnviado.message);
        }
        res.json({status: "Reserva Eliminada"});
    }
});

module.exports = router;
