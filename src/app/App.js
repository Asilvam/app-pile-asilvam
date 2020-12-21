import React, { Fragment, useState, useEffect } from "react";
import Formulario from "./components/Formulario";

function App() {
  // Arreglo de citas
  const [citas, guardarCitas] = useState([]);
  useEffect(() => {
    fetchTasks();
  }, []);

  const crearCita = (cita) => {
    guardarCitas([...citas, cita]);
  };

  const fetchTasks = () => {
    fetch("/api/reservas")
      .then((res) => res.json())
      .then((data) => {
        guardarCitas(data);
        console.log(data);
      });
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
      <div>
        {/* NAVIGATION */}
        <nav className="light-blue darken-4">
          <div className="container">
            <div className="nav-wrapper">
              <a href="/" className="brand-logo">
              Administrador de Reservas PILE
              </a>
            </div>
          </div>
        </nav>
        <div className="container">
         
          <div className="row">
            <div className="one-half column">
              <Formulario crearCita={crearCita} />
            </div>
            <div className="one-half column">
              <h3>{titulo}</h3>
              <table className="container-fluid">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Depto</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Cupos</th>
                  </tr>
                </thead>
                <tbody>
                  {citas.map((cita) => (
                    <tr key={cita._id}>
                      <td>{cita.nombre}</td>
                      <td>{cita.depto}</td>
                      <td>{cita.fecha}</td>
                      <td>{cita.hora}</td>
                      <td>{cita.numero}</td>
                      <td>
                        <button
                          className="btn light-blue darken-4"
                          style={{ margin: "4px" }}
                          onClick={() => eliminarCita(cita._id)}
                        >
                          <i className="material-icons">delete</i>
                        </button>
                        <button
                          className="btn light-blue darken-4"
                          style={{ margin: "4px" }}
                        >
                          <i className="material-icons">edit</i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
