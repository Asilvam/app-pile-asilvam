import React, {useState} from 'react';
import Swal from "sweetalert2";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

import Modal, {ModalTransition} from '@atlaskit/modal-dialog';


const Reserva = ({citas, fetchTasks}) => {

    const [modal, setModal] = useState(false);

    const [datoCorreo, setDatosCorreo] = useState({
        correo: ''
    });

    const [datoId, setDatosId] = useState({
        id: ''
    });

    const [datoEmail, setDatosEmail] = useState({
        email: ''
    });


    const updateState = e => {
        setDatosCorreo({
            [e.target.name]: e.target.value
        })
    };

    const toggle = () => {
        setModal(!modal);
        setDatosCorreo({correo: ''});
    }

    const openModal = (id = null, email = null) => {
        //console.log(id, ' ', email);
        setDatosId({id: id});
        setDatosEmail({email: email});
        //console.log(datoCorreo, ' ', datoId, ' ', datoEmail);
        toggle();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        toggle();
        if (datoCorreo.correo.length > 0) {
            //console.log(datoCorreo,  datoId, datoEmail);
            if (datoCorreo.correo.trim().toLowerCase() === datoEmail.email.trim().toLowerCase()) {
                fetch(`/api/reservas/${datoId.id}`, {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data.status);
                        if (data.status === "Reserva Eliminada") {
                            Swal.fire(
                                'Eliminar!',
                                'Tu reserva ha sido eliminada.',
                                'success'
                            )
                            fetchTasks();
                        } else {
                            Swal.fire({
                                title: 'Error!',
                                text: `${data.motivo}`,
                                icon: 'error'
                            })
                        }
                    });
            } else {
                Swal.fire(
                    'Error!',
                    'El correo no corresponde!',
                    'error'
                )
            }
        } else {
            Swal.fire(
                'Error!',
                'Debe ingresar un correo!',
                'error')
        }
    }

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
                                style={{margin: "5px"}}
                                onClick={() => openModal(cita.id, cita.email)}
                            >
                                <FontAwesomeIcon icon={faTrashAlt} fixedWidth/>
                            </button>
                        }
                    </td>
                </tr>
            ))}
            </tbody>
            <ModalTransition>
                {modal && (
                    <Modal
                        onClose={toggle}
                        heading="Eliminar Reserva"
                        appearance="warning"
                        width={'small'}
                    >
                        <>
                            <div className="row">
                                <div className="one-half column">
                                    <div className="callout callout-info">
                                        Recuerda que esta acción no es reversible.
                                        Y perderás tu reserva.
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="one-half column">
                                    <div className="form-group">
                                        <>
                                            <form onSubmit={handleSubmit}>
                                                <input
                                                    type="email"
                                                    name="correo"
                                                    className="u-full-width"
                                                    placeholder="Ingrese correo"
                                                    onChange={updateState}
                                                    value={datoCorreo.correo}
                                                    autoFocus
                                                    required
                                                />
                                                <button type="submit" className="btn deep-purple darken-4">
                                                    Aceptar
                                                </button>
                                                <button type="button" className="btn deep-purple darken-4"
                                                        style={{margin: "10px"}}
                                                        onClick={toggle}
                                                >
                                                    Cancelar
                                                </button>
                                            </form>
                                        </>
                                    </div>
                                </div>
                            </div>
                        </>
                    </Modal>
                )}
            </ModalTransition>
        </>
    );
};

export default Reserva;