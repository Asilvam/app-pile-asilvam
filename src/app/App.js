import React, {Fragment, useState, useEffect} from "react";
import Formulario from "./components/Formulario";
import Reserva from "./components/Reserva";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSync, faSwimmer} from "@fortawesome/free-solid-svg-icons";


function App() {
    // Arreglo de citas
    const [citas, guardarCitas] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const crearCita = (cita) => {
        guardarCitas([...citas, cita]);
    };

    const fetchTasks = () => {
        setLoading(true);
        fetch("/api/reservas")
            .then((res) => res.json())
            .then((data) => {
                guardarCitas(data);
                setLoading(false);
            })
            .catch((err) => console.error(err));
    };

    // Mensaje condicional
    const titulo = citas.length === 0 ? "No hay reservas" : "Reservas Activas";

    return (
        <Fragment>
            <div>
                <nav className="deep-purple darken-4">
                    <div className="container">
                        <a href="/" className="brand-logo">
                            <h5><FontAwesomeIcon icon={faSwimmer} fixedWidth/> Reservas PILE</h5>
                        </a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="one-half column">
                            <Formulario crearCita={crearCita}/>
                        </div>
                        <div className="one-half column">
                            {loading && <FontAwesomeIcon icon={faSync} spin />}
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
                                <Reserva
                                    citas={citas}
                                    fetchTasks={fetchTasks}
                                />
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
