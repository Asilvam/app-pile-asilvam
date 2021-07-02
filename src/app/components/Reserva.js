import React from 'react';
import Swal from "sweetalert2";


const deleteTask = (id, email) => {
    //console.log(email);
    if (confirm("Esta Seguro de Eliminar la reserva?")) {
        let correo = prompt("correo de validacion");
        if (!(correo === null)) {
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
                        if (data.status === "Reserva Eliminada") {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Reserva Eliminada!',
                                showConfirmButton: false,
                                timer: 3000
                            });
                            fetchTasks();
                        } else {
                            window.M.toast({html: `${data.motivo}`}, 3000);
                        }
                    });
            } else {
                alert("Correo no Corresponde!");
            }
        }
    }
};

const Reserva = ({citas}) => (
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
                            <i className="material-icons">delete</i>
                        </button>
                    }
                </td>
            </tr>
        ))}
        </tbody>
    </>
);

export default Reserva;

