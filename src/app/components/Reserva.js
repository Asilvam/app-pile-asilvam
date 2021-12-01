import React from 'react';
import Swal from "sweetalert2";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

import axios from 'axios';

const Reserva = ({citas, getCitas}) => {

    const deleteTask = (id, email) => {
        Swal.fire({
            title: 'Desea eliminar Reserva?',
            text: "no podrá anular esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                let correo = prompt('Ingresa email ');
                if (correo) {
                    if (correo.trim().toLowerCase() == email.trim().toLowerCase()) {
                        axios.delete(`/api/reservas/${id}`)
                            .then(response => {
                                if (response.data.status === "Reserva Eliminada") {
                                    Swal.fire(
                                        'Eliminar!',
                                        'Tu reserva ha sido eliminada.',
                                        'success'
                                    )
                                    getCitas();
                                } else {
                                    Swal.fire({
                                        title: 'Error!',
                                        text: `${response.data.motivo}`,
                                        icon: 'error'
                                    })
                                }
                            })
                            .catch((err) => console.error(err))
                    } else {
                        Swal.fire(
                            'Error!',
                            'El correo no corresponde!',
                            'error'
                        )
                    }
                }
            }
        })
    };

    return (
        <>
            <tbody>
            {citas.map(cita => (
                <tr key={cita.id}>
                    <td>{cita.nombre}</td>
                    <td>{cita.depto}</td>
                    <td>{cita.fechaST}</td>
                    <td>{cita.horaST}</td>
                    <td>{cita.numero}</td>
                    <td>
                        {
                            <button
                                className="btn deep-purple darken-4"
                                style={{margin: "4px"}}
                                onClick={() => deleteTask(cita.id, cita.email)}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} fixedWidth/>
                            </button>
                        }
                    </td>
                </tr>
            ))}
            </tbody>
        </>
    );
};

export default Reserva;

