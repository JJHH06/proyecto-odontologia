import React, { useState } from 'react';
import './Navbar.scss';
import Logotipo from '../../assets/BLANCO_Sin_Fondo.png';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {faUserInjured} from '@fortawesome/free-solid-svg-icons';
import {faBoxes} from '@fortawesome/free-solid-svg-icons';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons';
import {faMedkit} from '@fortawesome/free-solid-svg-icons';

// objeto de la calculadora
function Navbar({currentUser}) {

    return (
      
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img src={Logotipo} className="img-fluid size-img" />
            </a>
            <button
              data-toggle="collapse"
              className="navbar-toggler"
              data-target="#navcol-1"
              type="button"
              aria-controls="navcol-1"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
                <span className="sr-only">Toggle navigation</span>
                <span>
                <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                </span>
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="navbar-nav flex-grow-1">
                <li className="nav-item" role="presentation">
                  <Link className="nav-link" to='/'><FontAwesomeIcon icon={faHome}></FontAwesomeIcon> Home</Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faUserInjured}></FontAwesomeIcon>{" "}
                    Pacientes
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
 
                        <Link className="dropdown-item" to='/informacion_pacientes'>Informacion de Pacientes</Link>
                      
                    </li>
                    <li>
                      
                      <Link className="dropdown-item" to='/ingresar_paciente'>Ingresar nuevo Paciente</Link>
                      
                    </li>
                  </ul>
                </li>
                <li className="nav-item" role="presentation">
                  <Link className="nav-link" to="/inventario">
                    <FontAwesomeIcon icon={faBoxes}></FontAwesomeIcon>{" "}
                    Inventario
                  </Link>
                </li>
                <li className="nav-item" role="presentation">
                  <Link className="nav-link" to='/agenda'><FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon>{" "} 
                  Agenda
                  </Link>
                </li>
                {
                  currentUser && currentUser.tipo && currentUser.tipo === 'Administrador'?
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon={faUserInjured}></FontAwesomeIcon>{" "}
                    Administracion
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
 
                        <Link className="dropdown-item" to='/Tratamiento'><FontAwesomeIcon icon={faMedkit}></FontAwesomeIcon> Tratamientos</Link>
                      
                    </li>
                    <li>
                      
                      <Link className="dropdown-item" to='/Empleados'><FontAwesomeIcon icon={faAddressCard}></FontAwesomeIcon> Empleados</Link>
                      
                    </li>
                  </ul>
                </li>:null}
                <li className="nav-item" role="presentation">
                  <a className="nav-link" href="#">
                    <FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon> Sign out
                  </a>
                  
                </li>
              </ul>
            </div>
          </div>
        </nav>
      
    );
}

export default Navbar;


/*
                    <div className='d-flex flex-row order-2 order-lg-2'>
                        <ul className='navbar-nav flex-row'>
                            <li className='nav-item'>
                                <a className='nav-link'> Sign Out</a>
                            </li>
                        </ul>
                    </div>
*/