import React, { useState } from 'react';
import './Formulario.scss';

function Formulario() {

    return (
        <div className='formulario-paciente'>
            <div className='container'>
                <h1>Ficha Nuevo Paciente</h1>
                <form>
                    <div className=''>
                        <label htmlFor='nombre'>Nombre</label>
                        <input type="text" name="nombre" className="form-control"/>
                    </div>
                    <div>
                        <label htmlFor='telefono_casa'>Nombre</label>
                        <input type="tel" name="telefono_casa" pattern="[0-9]{4}-[0-9]{4}" className="form-control"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Formulario;