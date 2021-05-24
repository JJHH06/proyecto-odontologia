import React, { useState } from 'react';
import './Navbar.scss';
import Logotipo from '../../assets/BLANCO_Sin_Fondo.png';
import 'bootstrap/dist/js/bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {faUserInjured} from '@fortawesome/free-solid-svg-icons';
import {faBoxes} from '@fortawesome/free-solid-svg-icons';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';


// objeto de la calculadora
function Homescreen() {

    return (
        <div className='nav-container'>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <div className='container'>
                    <a className='navbar-brand' href='#'>
                        <img src={Logotipo} className='img-fluid size-img' />
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarCollapse'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item' role="presentation">
                                <a className = 'nav-link' href='#'><FontAwesomeIcon icon={faHome}></FontAwesomeIcon> Home</a>
                            </li>
                            <li className='nav-item' role="presentation">
                                <a className = 'nav-link' href='#'><FontAwesomeIcon icon={faUserInjured}></FontAwesomeIcon> Pacientes</a>
                            </li>
                            <li className='nav-item' role="presentation">
                                <a className = 'nav-link' href='#'><FontAwesomeIcon icon={faBoxes}></FontAwesomeIcon> Inventario</a>
                            </li>
                            <li className='nav-item' role="presentation">
                                <a className = 'nav-link' href='#'><FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon> Calendario</a>
                            </li>
                            <li className='nav-item' role="presentation">
                                <a className='nav-link' href='#'><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon> Sign out</a>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Homescreen;


/*
                    <div className='d-flex flex-row order-2 order-lg-2'>
                        <ul className='navbar-nav flex-row'>
                            <li className='nav-item'>
                                <a className='nav-link'> Sign Out</a>
                            </li>
                        </ul>
                    </div>
*/