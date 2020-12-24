const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReservaSchema = new Schema({
  email: { type: String, required: true },
  nombre: { type: String, required: true },
  fecha: { type: Date, required: true },
  fechaST: { type: String,required: true  },
  hora: { type: String, required: true },
  depto: { type: String, required: true },
  celular: { type: String, required: true },
  numero: { type: Number, required: true },
  created_at: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Reserva", ReservaSchema);
