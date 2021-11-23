import React, { useEffect, useState } from 'react';
import './Inventario.scss';
import { Paper } from '@material-ui/core';
import {SortingState, IntegratedSorting, SearchState, IntegratedFiltering, EditingState } from '@devexpress/dx-react-grid';
import { Grid, Table, Toolbar, SearchPanel, TableHeaderRow, TableEditRow, TableEditColumn } from '@devexpress/dx-react-grid-material-ui';


// objeto de la calculadora
function Inventario2({token}) {

    const [productosEncontrados, setProductosEncontrados] = useState([]);



    const columns = [
        { name: 'nombre_item', title: 'Producto' },
        { name: 'cantidad', title: 'Cantidad' },
        { name: 'ultima_fecha', title: 'Fecha de actualizacion' }
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

        // const row = productosEncontrados.map((producto, index) => {
        //     const temp = {...producto};
        //     delete temp.id_item;
        //     return temp;
        // });

        // setProductos(row);

    }, [productosEncontrados]);

    const commitChanges = ({ added, changed, deleted }) => {
        if (added) {
            let producto1 = '';
            let cantidad1 = '';
            console.log(added);
            added.map((producto, index) => {
                    producto1 = producto.nombre_item;
                    cantidad1 = producto.cantidad;
            });
            console.log(producto1);
            console.log(cantidad1);

            if(producto1 !== "" && cantidad1 !== ""){
                var axios = require('axios');
                var data = JSON.stringify({
                    nombre_item: producto1,
                    cantidad: cantidad1
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
                })
                .catch(function (error) {
                    alert("Error al registrar el nuevo producto");
                    console.log(error);
                });

            } else {
                alert("Error al registrar el producto");
            }
        }
      };
    
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
                        <EditingState
                            onCommitChanges={commitChanges}
                        />
                        <Table />
                        <TableHeaderRow showSortingControls />
                        <TableEditRow />
                        <TableEditColumn
                            showAddCommand
                        />
                        <Toolbar />
                        <SearchPanel />
                    </Grid>
                </Paper>

            </div>
        </div>
    );
}

export default Inventario2;