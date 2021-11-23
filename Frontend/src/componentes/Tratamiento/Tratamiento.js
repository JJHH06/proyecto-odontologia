import React, { useEffect, useState } from 'react';
import './Tratamiento.scss';
import { Paper } from '@material-ui/core';
import {SortingState, IntegratedSorting, SearchState, IntegratedFiltering, EditingState, PagingState, IntegratedPaging } from '@devexpress/dx-react-grid';
import { Grid, Table, Toolbar, SearchPanel, TableHeaderRow, TableEditRow, TableEditColumn, PagingPanel } from '@devexpress/dx-react-grid-material-ui';

function Tratamiento({token}) {

  const [tratamientosEncontrados, setTratamientosEncontrados] = useState([]);
  const [update, setUpdate] = useState(0);

  const columns = [
    { name: 'nombre', title: 'Tratamiento' },
    { name: 'precio', title: 'Precio' },
  ];

  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      let tratamiento1 = '';
      let precio1 = '';
      added.map((tratamiento, index) => {
              tratamiento1 = tratamiento.nombre;
              precio1 = tratamiento.precio;
      });
      console.log(tratamiento1);
      console.log(precio1);

      if(tratamiento1 !== "" && precio1 !== ""){
        var axios = require('axios');
        var data = JSON.stringify({
          "nombre": tratamiento1,
          "precio": precio1
        });

        var config = {
          method: 'post',
          url: 'http://198.211.103.50:5000/api/tratamiento/addTratamiento',
          headers: { 
            'Authorization': 'Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkX2F0dGVtcCI6IjEyM0BnbWFpbC5jb20iLCJwYXNzX2F0dGVtcCI6IjEyMyJ9LCJpYXQiOjE2Mzc2NTI5MjUsImV4cCI6MTYzNzczOTMyNX0.nw-S1TGX5Z9RWDX7bXAtzzxbag8r6VhoN00I5-VEJG8', 
            'Content-Type': 'application/json'
          },
          data : data
        };

        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          setUpdate(update + 1);
          console.log(update);
          setUpdate(update + 1);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
    if (changed) {
      let id_tratamiento = '';
      let tratamiento1 = '';
      let precio1 = '';
      tratamientosEncontrados.map((tratamiento, index) => {
        if (changed[index]) {
          if(changed[index].nombre !== undefined){
            tratamiento1 = changed[index].nombre;
          } else {
            tratamiento1 = tratamiento.nombre;
          }
          if(changed[index].precio !== undefined){
            precio1 = changed[index].precio;
          } else {
            precio1 = tratamiento.precio;
          }
          id_tratamiento = tratamiento.id_tratamiento;
        }
      });
      console.log(id_tratamiento);
      console.log(tratamiento1);
      console.log(precio1);

      var axios = require('axios');
      var data = JSON.stringify({
        "id_tratamiento": id_tratamiento,
        "nombre": tratamiento1,
        "precio": precio1
      });

      var config = {
        method: 'put',
        url: 'http://198.211.103.50:5000/api/tratamiento/updateTratamiento',
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
      var submit = window.confirm('¿Está seguro que desea eliminar el tratamiento?');
      if(submit){
        let id_tratamiento = '';
        tratamientosEncontrados.map((tratamiento, index) => {
          if (deleted[0] === index) {
            id_tratamiento = tratamiento.id_tratamiento;
            console.log(tratamiento.nombre);
          }
        });
        console.log(id_tratamiento);


        var axios = require('axios');
        var data = JSON.stringify({
          "id_tratamiento": id_tratamiento
        });

        var config = {
          method: 'delete',
          url: 'http://localhost:5000/api/tratamiento/deleteTratamiento',
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

  useEffect(() => {
    var axios = require('axios');
    var data = '';

    var config = {
      method: 'get',
      url: 'http://198.211.103.50:5000/api/tratamiento/getAllTratamientos',
      headers: { 
        'Authorization': 'Bearer  ' + token,
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      setTratamientosEncontrados(response.data.result);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [update]);

  return (
    <div>
      <div className='container'>
        <div className='titulo-principal'>
          <h1>Tratamiento</h1>
        </div>
        <Paper className='back-color'>
          <Grid
            rows={tratamientosEncontrados}
            columns={columns}
          >
            <SearchState  />
            <IntegratedFiltering />
            <SortingState
                defaultSorting={[{ columnName: 'nombre', direction: 'asc' }]}
            />
            <IntegratedSorting />
            <PagingState
            defaultCurrentPage={0}
            pageSize={20}
            />
            <IntegratedPaging />
            <EditingState
                onCommitChanges={commitChanges}
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

export default Tratamiento;