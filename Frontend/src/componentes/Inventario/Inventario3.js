import React, { useEffect, useState } from 'react';
import './Inventario.scss';
import { Paper } from '@material-ui/core';
import {SortingState, IntegratedSorting, SearchState, IntegratedFiltering, EditingState, PagingState, IntegratedPaging } from '@devexpress/dx-react-grid';
import { Grid, Table, Toolbar, SearchPanel, TableHeaderRow, TableEditRow, TableEditColumn, PagingPanel } from '@devexpress/dx-react-grid-material-ui';


// objeto de la calculadora
function Inventario2({token}) {

    const [productosEncontrados, setProductosEncontrados] = useState([]);
    const [update, setUpdate] = useState(0);
    const [editingStateColumnExtensions] = useState([
        { columnName: 'ultima_fecha', editingEnabled: false },
      ]);


    const columns = [
        { name: 'nombre_item', title: 'Producto' },
        { name: 'cantidad', title: 'Cantidad' },
        { name: 'ultima_fecha', title: 'Fecha de actualizacion' }
    ];

    const handleUpdate = async () => {
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
    }

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

    }, [update]);

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
                url: 'http://198.211.103.50:5000/api/inventario/addItem',
                headers: { 
                    'Authorization': 'Bearer  ' + token, 
                    'Content-Type': 'application/json'
                },
                data : data
                };

                axios(config)
                .then(function (response) {
                alert("Nuevo producto ingresado con exito");
                // setTimeout(setUpdate(update + 1), 10000);
                setUpdate(update + 1);
                console.log(update);
                setUpdate(update + 1);
                })
                .catch(function (error) {
                    alert("Error al registrar el nuevo producto");
                    console.log(error);
                });

                setUpdate(update + 1);

            } else {
                alert("Error al registrar el producto");
            }
        }
        if (changed) {
            let id_item = '';
            let producto1 = '';
            let cantidad1 = '';
            productosEncontrados.map((producto, index) => {
                if (changed[index]) {
                    console.log("funciona");
                    if(changed[index].nombre_item !== undefined){
                        producto1 = changed[index].nombre_item;
                    } else {
                        producto1 = producto.nombre_item;
                    }
                    if(changed[index].cantidad !== undefined){
                        cantidad1 = changed[index].cantidad;
                    } else {
                        cantidad1 = producto.cantidad;
                    }
                    id_item = producto.id_item;
                }  
            });
            console.log(id_item);
            console.log(producto1);
            console.log(cantidad1);

            var axios = require('axios');
            var data = JSON.stringify({
            "id_item": id_item,
            "nombre_item": producto1,
            "cantidad": cantidad1
            });
            var config = {
            method: 'put',
            url: 'http://198.211.103.50:5000/api/inventario/upadteItem',
            headers: { 
                'Authorization': 'Bearer  ' + token,
                'Content-Type': 'application/json'
            },
            data : data
            };
            axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            setUpdate(update + 1);
            })
            .catch(function (error) {
            console.log(error);
            });
            
        }
        if (deleted) {
            var submit = window.confirm("¿Esta seguro que desea eliminar el producto?");
            if(submit){
                console.log(deleted);
                let id_item = '';
                productosEncontrados.map((producto, index) => {
                    if (deleted[0] === index) {
                        id_item = producto.id_item;
                        console.log(producto.nombre_item);
                    }  
                });

                var axios = require('axios');
                var data = JSON.stringify({
                    "id_item": id_item
                });

                var config = {
                method: 'delete',
                url: 'http://198.211.103.50:5000/api/inventario/deleteItem',
                headers: { 
                    'Authorization': 'Bearer  ' + token,
                    'Content-Type': 'application/json'
                },
                data : data
                };

                axios(config)
                .then(function (response) {
                console.log(JSON.stringify(response.data));
                setUpdate(update + 1);
                })
                .catch(function (error) {
                console.log(error);
                });
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
                        <PagingState
                        defaultCurrentPage={0}
                        pageSize={10}
                        />
                        <IntegratedPaging />
                        <EditingState
                            onCommitChanges={commitChanges}
                            columnExtensions={editingStateColumnExtensions}
                        />
                        <Table />
                        <TableHeaderRow showSortingControls />
                        <TableEditRow />
                        <TableEditColumn
                            showAddCommand
                            showEditCommand
                            showDeleteCommand
                        />
                        <Toolbar />
                        <SearchPanel />
                        <PagingPanel />
                    </Grid>
                </Paper>

            </div>
        </div>
    );
}

export default Inventario2;