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
        //console.log(data);
      });
  };

  const deleteTask = (id, email) => {
    //console.log(email);
    if (confirm("Esta Seguro de Eliminar la reserva?")) {
      let correo = prompt("correo de validacion");
      if (!(correo ===null)) {
        if (correo.trim().toLowerCase() == email.trim().toLowerCase()) {
          fetch(`/api/reservas/${id}`, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              M.toast({ html: "Reserva Eliminada" });
              fetchTasks();
            });
        } else {
          alert("Correo no Corresponde!");
        }
      }
    }
  };

  // Mensaje condicional
  const titulo = citas.length === 0 ? "No hay reservas" : "Reservas";

  return (
    <Fragment>
      <div>
        {/* NAVIGATION */}
        <nav className="deep-purple darken-4">
          <div className="container">
            <a href="/" className="brand-logo">
              <h5>Reservas PILE</h5>
            </a>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="one-half column">
              <Formulario crearCita={crearCita} />
            </div>
            <div className="one-half column">
              <h5>{titulo}</h5>
              <table className="striped bordered">
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
                      <td>{cita.fechaST}</td>
                      <td>{cita.hora}</td>
                      <td>{cita.numero}</td>
                      <td>
                        {
                          <button
                            className="btn deep-purple darken-4"
                            style={{ margin: "4px" }}
                            onClick={() => deleteTask(cita._id, cita.email)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                        }
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
