import React, { useEffect, useState } from 'react';
import './Inventario.scss';
import { Paper } from '@material-ui/core';
import {SortingState, IntegratedSorting, SearchState, IntegratedFiltering } from '@devexpress/dx-react-grid';
import { Grid, Table, Toolbar, SearchPanel, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import axios from 'axios';


// objeto de la calculadora
function Inventario2({token}) {

    const [productosEncontrados, setProductosEncontrados] = useState([]);
    const [productos, setProductos] = useState([]);

    const columns = [
        { name: 'nombre_item', title: 'Producto' },
        { name: 'cantidad', title: 'Cantidad' },
        { name: 'ultima_fecha', title: 'Fecha de actualizacion' }
    ];

    const rows = [
        { id_item: '1', nombre_item: 'guantes', cantidad: '20', ultima_fecha: '10/10/2021' },
        { id_item: '2', nombre_item: 'mascarillas', cantidad: '30', ultima_fecha: '1/01/2021' },
    ];

    useEffect(() => {
        var axios = require('axios');

        var config = {
            method: 'post',
            url: 'http://198.211.103.50:5000/api/inventario/getAllItems',
            headers: {
                'Authorization': 'Bearer  ' + token, 
                'Content-Type': 'application/json'
            }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            setProductosEncontrados(response.data.result);
        })
        .catch(function (error) {
            console.log(error);
        });

        const row = productosEncontrados.map((producto, index) => {
            const temp = {...producto};
            delete temp.id_item;
            return temp;
        });

        setProductos(row);

    }, []);
    
    return (
        <div className=''>
            <div className='container'>
                <div className = "titulo-principal">
                    <h1>Inventario</h1>
                </div>
                <Paper className='back-color'>
                    <Grid
                        rows={productosEncontrados}
                        columns={columns}
                    >
                        <SearchState  />
                        <IntegratedFiltering />
                        <SortingState
                            defaultSorting={[{ columnName: 'nombre_item', direction: 'asc' }]}
                        />
                        <IntegratedSorting />
                        <Table />
                        <TableHeaderRow showSortingControls />
                        <Toolbar />
                        <SearchPanel />
                    </Grid>
                </Paper>

            </div>
        </div>
    );
}

export default Inventario2;