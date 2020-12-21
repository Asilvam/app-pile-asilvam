import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";


function App() {
  // Arreglo de citas
  const [citas, guardarCitas] = useState([]);

  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  // Función que elimina una cita por su id
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita._id !== id);
    guardarCitas(nuevasCitas);
  };

  // Mensaje condicional
  const titulo = citas.length === 0 ? "No hay reservas" : "Reservas";

  return (
    <Fragment>
      <div className="container">
        <h1>Administrador de Reservas PILE</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita._id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
