import React, { useState } from 'react';
import './Inventario.scss';
import Producto from './Productos';
import Productos from './Productos';
import axios from 'axios';
import { useHistory } from 'react-router-dom'

// objeto de la calculadora
function Inventario() {

    const [productosEncontrados, setProductosEncontrados] = useState("");
    const history = useHistory();

    var axios = require('axios');

    var config = {
        method: 'post',
        url: 'http://localhost:5000/api/inventario/getAllItems',
        headers: { }
    };

    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        setProductosEncontrados(response.data.result);
    })
    .catch(function (error) {
    console.log(error);
    });

    const handleProduct = () =>{
        history.push({
            pathname: `/nuevo_producto`
        });
    }



    
    return (
        <div data-testid="search-patient" className = "container">

            <div className = "btn-space">
                <button className="btn btn-secondary btn-lg" onClick={handleProduct}>Agregar Producto</button>
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
                productosEncontrados.length === 0 ? <span data-testid="cargando-info"/>:
                    productosEncontrados.map((inventario, index) =>(
                        <Producto inventario = {inventario}/>
                    ))
            }

        </div>
    );
}

export default Inventario;