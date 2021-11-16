import React, { useState } from 'react';
import './AddProduct.scss';
import axios from 'axios';

// objeto de la calculadora
function AddProducto({token}) {
    const [producto, setProducto] = useState("");
    const [cantidad, setCantidad] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        var axios = require('axios');
        var data = JSON.stringify({
            nombre_item: producto,
            cantidad: cantidad
        });

        var config = {
        method: 'post',
        url: 'http://localhost:5000/api/inventario/addItem',
        headers: { 
            'Authorization': 'Bearer  ' + token, 
            'Content-Type': 'application/json'
          },
        data : data
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("Nuevo producto ingresado con exito");
        console.log(producto);
        console.log(cantidad);
        })
        .catch(function (error) {
            alert("Error al registrar el nuevo producto");
            console.log(error);
        });
    };
    
    return (
        <div className="formulario-paciente">
            <div className='container'>
                <h1>
                    Ingresar nuevo Producto
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className='form-space'>
                        <label htmlFor = 'producto'>Nombre del Producto</label>
                        <input type='text' name='producto' className='form-control' onChange={(e) => setProducto(e.target.value)}/>
                    </div>
                    <div className='form-space'>
                        <label htmlFor = 'cantidad'>Cantidad</label>
                        <input type='number' name='cantidad' className='form-control' min = '1' onChange={(e) => setCantidad(e.target.value)}/>
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