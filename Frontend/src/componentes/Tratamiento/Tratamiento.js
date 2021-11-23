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
      console.log(added);
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