import React from "react";


const Cita = ({ cita, eliminarCita }) => (
  <div >
    <p>
      nombre: <span>{cita.nombre}</span>
    </p>
    <p>
      Depto: <span>{cita.depto}</span>
    </p>
    <p>
      Fecha: <span>{cita.fecha}</span>
    </p>
    <p>
      Hora: <span>{cita.hora}</span>
    </p>
    <p>
      Cupos: <span>{cita.numero}</span>
    </p>
    <button
      className="button eliminar u-full-width"
      onClick={() => eliminarCita(cita._id)}
    >
      Eliminar &times;
    </button>
  </div>
);


export default Cita;
