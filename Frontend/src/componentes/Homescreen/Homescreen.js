import React from "react";

import logo from "../../assets/FULL_COLOR.png";
import inventory from "../../assets/inventory.jpg";
import agenda from "../../assets/agenda.jpg";
import { Link } from 'react-router-dom';
import "./Homescreen.scss";

function Homescreen() {
  return (
    <div className="container">
      <div className="row jumbotron p-4 p-md-5 text-white rounded bg-dark innitial-banner">
        <div className="col-md-6 px-0">
          <h1 className="display-4 font-italic">
            ¡Bienvenido Aministrador Pedro Lopez!
          </h1>
          <p className="lead my-3">
            Ademas de unicamente guardar datos de los pacientes, este es un
            sistema integrado mediante agenta, inventario, diagnostico de
            pacientes y generacion de presupuesto.
          </p>
          <p className="lead mb-0">
            <a
              href="informacion_pacientes"
              className="text-white font-weight-bold"
            >
              Encuentra a pacientes dentro de la clinica...
            </a>
          </p>
        </div>
        <div className="col banner-image-container">
          <img
            className="bd-placeholder-img banner-image"
            width={400}
            src={logo}
          />
        </div>
      </div>

      <div className="row mb-2 mt-4">
          <div className="col-md px-4">
            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="text-hanger-title d-inline-block mb-2">
                  
                </strong>
                <h3 className="mb-0">Inventario</h3>
                <div className="mb-1 text-muted"></div>
                <p className="card-text mb-auto mt-1">
                  Pon al dia el inventario de instrumentaria existente, se recomienda hacer una vez a la semana.
                </p>
                <Link to='/inventario' className="text-muted stretched-link">
                  Ir a inventario
                </Link>
              </div>
              <div className="col-auto d-none d-lg-block">
                <img
                  className="bd-placeholder-img"
                  width="200"
                  height="250"
                  src={inventory}
                />
              </div>
            </div>
          </div>
          <div className="col-md  px-2">
            <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
              <div className="col p-4 d-flex flex-column position-static">
                <strong className="d-inline-block mb-2 text-hanger-title">
                  
                </strong>
                <h3 className="mb-0">Agenda</h3>
                <div className="mb-1 text-muted"></div>
                <p className="mb-auto">
                  Agenda citas para pacientes, modifica y elimina citas existentes, ademas de tener bien organizada la planeación de las citas dentro del sistema.
                </p>
                <Link to='/agenda' className="text-muted stretched-link">
                  Ir a agenda
                </Link>
              </div>
              <div className="col-auto d-none d-lg-block">
                <img
                  className="bd-placeholder-img"
                  width="200"
                  height="250"
                  src={agenda}
                />
              </div>
            </div>
          </div>
        </div>

    </div>
  );
}

export default Homescreen;
