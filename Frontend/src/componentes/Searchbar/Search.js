/* eslint-disable prefer-template */
import React, { useState } from 'react';
import './search.scss';
import Logotipo from '../../assets/BLANCO_Sin_Fondo.png';


// objeto de la calculadora
function Search() {

    return (
        <div className = "container">
           
            <div className = "row">
                <div className = "col-10 input-group input-search-patient">
                <input type="text" className="form-control" placeholder="Nombre del paciente" aria-label="Recipient's username with two button addons"/>
                
                <button type="submit" className="btn btn-secondary btn-lg">Buscar</button>
                </div>
            </div>
            
            <hr className="featurette-divider search-separator"/>
            <div className = "row">
                <div className="col">
                    <b>Nombre</b>
                </div>
                <div className="col">
                    <b>Edad</b>

                </div>

                <div className="col">
                    <b>Telefono</b>

                </div>
            </div>

        </div>
    );
}

export default Search;
