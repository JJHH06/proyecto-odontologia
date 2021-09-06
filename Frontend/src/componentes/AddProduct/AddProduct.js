import React, { useState } from 'react';
import './AddProduct.scss';
import axios from 'axios';

// objeto de la calculadora
function AddProducto() {
    
    return (
        <div className="formulario-paciente">
            <div className='container'>
                <h1>
                    Ingresar nuevo Producto
                </h1>
                <form>
                    <div className='form-space'>
                        <label htmlFor = 'producto'>Nombre del Producto</label>
                        <input type='text' name='producto' className='form-control' />
                    </div>
                    <div className='form-space'>
                        <label htmlFor = 'cantidad'>Cantidad</label>
                        <input type='number' name='producto' className='form-control' min = '1'/>
                    </div>
                    <div className="form-space boton-align">
                        <input
                            className = 'boton-formulario'
                            type="submit"
                            name="submit"
                            value="Registrar nuevo producto"
                        />
                    </div>
                </form>
            </div>


        </div>
    );
}

export default AddProducto;