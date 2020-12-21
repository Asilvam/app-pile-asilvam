import React, { Fragment, useState, useEffect } from "react";

const Formulario = ({ crearCita }) => {
  const [cita, actualizarCita] = useState({
    email: "",
    nombre: "",
    fecha: "",
    hora: "",
    depto: "",
    celular: "",
    numero: "",
  });

  const [error, actualizaError] = useState(false);

  const actualizarState = (e) => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
    //console.log(e.target.value);
  };

  const { email, nombre, fecha, hora, depto, numero, celular } = cita;

  const addTask = (e) => {
    e.preventDefault();
    fetch("/api/reservas", {
      method: "POST",
      body: JSON.stringify(cita),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        fetchTasks();
      })
      .catch((err) => console.error(err));
  };

  const cargaReservas = (reservas) => {
    const Carga = reservas.map(function (valor) {
      crearCita(valor);
      return;
    });
  };

  const fetchTasks = () => {
    fetch("/api/reservas")
      .then((res) => res.json())
      .then((response) => {
        response.data;
      });
  };

  const submitCita = (e) => {
    e.preventDefault();
    if (email.trim() === "" || nombre.trim() === "" || depto.trim() === "") {
      actualizaError([true]);
      return;
    }
    actualizaError(false);
    //console.log(cita)
    crearCita(cita);
    actualizarCita({
      email: "",
      nombre: "",
      fecha: "",
      hora: "",
      depto: "",
      celular: "",
      numero: "",
    });
  };

  return (
    <Fragment>
      <h2> Crea Reserva</h2>
      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}

      <form onSubmit={addTask}>
        <label>Ingrese correo</label>
        <input
          type="email"
          name="email"
          className="u-full-width"
          placeholder="Ingrese correo"
          onChange={actualizarState}
          value={email}
        />
        <label>Nombre </label>
        <input
          type="text"
          name="nombre"
          className="u-full-width"
          placeholder="nombre y apellido"
          onChange={actualizarState}
          value={nombre}
        />
        <label>Celular </label>
        <input
          type="text"
          name="celular"
          className="u-full-width"
          placeholder="+56912345678"
          onChange={actualizarState}
          value={celular}
        />
        <label>Nº Depto </label>
        <input
          type="text"
          name="depto"
          className="u-full-width"
          placeholder="Numero Departamento"
          onChange={actualizarState}
          list="deptos"
          value={depto}
        />
        <datalist id="deptos">
          <option value="201" />
          <option value="202" />
          <option value="203" />
          <option value="204" />
          <option value="205" />
          <option value="206" />
          <option value="207" />
          <option value="208" />
          <option value="301" />
          <option value="302" />
          <option value="303" />
          <option value="304" />
          <option value="305" />
          <option value="306" />
          <option value="307" />
          <option value="308" />
          <option value="401" />
          <option value="402" />
          <option value="403" />
          <option value="404" />
          <option value="405" />
          <option value="406" />
          <option value="407" />
          <option value="408" />
          <option value="501" />
          <option value="502" />
          <option value="503" />
          <option value="504" />
          <option value="505" />
          <option value="506" />
          <option value="507" />
          <option value="508" />
          <option value="601" />
          <option value="602" />
          <option value="603" />
          <option value="604" />
          <option value="605" />
          <option value="606" />
          <option value="607" />
          <option value="608" />
          <option value="701" />
          <option value="702" />
          <option value="703" />
          <option value="704" />
          <option value="705" />
          <option value="706" />
          <option value="707" />
          <option value="708" />
          <option value="801" />
          <option value="802" />
          <option value="803" />
          <option value="804" />
          <option value="805" />
          <option value="806" />
          <option value="807" />
          <option value="808" />
          <option value="901" />
          <option value="902" />
          <option value="903" />
          <option value="904" />
          <option value="905" />
          <option value="906" />
          <option value="907" />
          <option value="908" />
          <option value="1001" />
          <option value="1002" />
          <option value="1003" />
          <option value="1004" />
          <option value="1005" />
          <option value="1006" />
          <option value="1007" />
          <option value="1008" />
          <option value="1101" />
          <option value="1102" />
          <option value="1103" />
          <option value="1104" />
          <option value="1105" />
          <option value="1106" />
          <option value="1107" />
          <option value="1108" />
          <option value="1201" />
          <option value="1202" />
          <option value="1203" />
          <option value="1204" />
          <option value="1205" />
          <option value="1206" />
          <option value="1207" />
          <option value="1208" />
          <option value="1301" />
          <option value="1302" />
          <option value="1303" />
          <option value="1304" />
          <option value="1305" />
          <option value="1306" />
          <option value="1307" />
          <option value="1308" />
          <option value="1401" />
          <option value="1402" />
          <option value="1403" />
          <option value="1404" />
          <option value="1405" />
          <option value="1406" />
          <option value="1407" />
          <option value="1408" />
        </datalist>

        <label>Fecha </label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
          min="2020-12-01"
          max="2021-02-28"
        />

        <label>Hora </label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
          min="10:00"
          max="21:00"
          list="listaHoras"
        />

        <datalist id="listaHoras">
          <option value="10:00" />
          <option value="11:00" />
          <option value="12:00" />
          <option value="13:00" />
          <option value="14:00" />
          <option value="15:00" />
          <option value="16:00" />
          <option value="17:00" />
          <option value="18:00" />
          <option value="19:00" />
          <option value="20:00" />
          <option value="21:00" />
        </datalist>

        <label>Numero de personas</label>
        <input
          type="number"
          className="u-full-width"
          min="1"
          max="4"
          name="numero"
          onChange={actualizarState}
          value={numero}
          list="personas"
        />

        <datalist id="personas">
          <option value="1" />
          <option value="2" />
          <option value="3" />
          <option value="4" />
        </datalist>

        <button type="submit" className="u-full-width button-primary">
          Agregar Reserva
        </button>
      </form>
    </Fragment>
  );
};

export default Formulario;
