const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReservaSchema = new Schema({
  email: { type: String, required: true, trim: true },
  nombre: { type: String, required: true, trim: true },
  fecha: { type: Date, required: true, trim: true },
  fechaST: { type: String, required: true, trim: true },
  hora: { type: String, required: true, trim: true },
  depto: { type: String, required: true, trim: true },
  celular: { type: String, required: true, trim: true },
  numero: { type: Number, required: true, trim: true },
  created_at: { type: Date, },
});

module.exports = mongoose.model("Reserva", ReservaSchema);
