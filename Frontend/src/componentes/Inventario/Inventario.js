import React, { useState } from 'react';
import './Inventario.scss';
import Producto from './Productos';
import Productos from './Productos';

// objeto de la calculadora
function Inventario() {
    
    return (
        <div data-testid="search-patient" className = "container">

            <div className = "btn-space">
                <button className="btn btn-secondary btn-lg">Nuevo Inventario</button>
            </div>
           
            <div className = "titulo-principal">
                <h1>Inventario</h1>
            </div>
            
            <div className = "row header-busqueda style">
                <div className="col">
                    <b>Producto</b>
                </div>

                <div className="col">
                    <b>Cantidad</b>
                </div>
                <div className="col">
                    <b>Fecha de actualizacion</b>
                </div>
                <div className="col">
                    <b>Alerta</b>
                </div>
            </div>

            {
                <Producto />
            }

        </div>
    );
}

export default Inventario;