import React, {useEffect, useState} from 'react'
import './Empleados.scss'
import axios from 'axios';
import Row from './utils/Row';
import EditEmployee from './utils/EditEmployee';
const fillData = (token, setRows) =>{
  var data = '';

  var config = {
    method: 'get',
    url: 'http://198.211.103.50:5000/api/empleado/getAllEmpleados',
    headers: { 
      'Authorization': 'Bearer  ' + token,
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(response.data.result)
    setRows(response.data.result);
  })
  .catch(function (error) {
    console.log(error);
  });
} 
function Empleados({token}) {
  //create employee viewer table component
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentEmployee, setCurrentEmployee]= useState({isEdit: false});
  React.useEffect(() => {
    fillData(token, setRows);
  }, []);

  React.useEffect(() => {
    if(!currentEmployee.isEdit){
      fillData(token, setRows);
    }
  }, [currentEmployee]);
  return (
    <div className="empleados-container">
      <h1 className="text-center mb-4 mt-4">Empleados</h1>
      {/*button to add new employee */}
      <button className="btn btn-outline-primary mb-4" disabled={currentEmployee.isEdit} onClick={()=>{setCurrentEmployee({isEdit: true})}}>{currentEmployee.isEdit?'':'Agregar Empleado'}</button>
      {currentEmployee.isEdit? <EditEmployee token={token} currentEmployee={currentEmployee} setCurrentEmployee={setCurrentEmployee}/>:
      <table className="table table-hover ">
        <thead>
          <tr>
            <th>Correo</th>
            <th>Nombre</th>
            <th>Tipo</th>

          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <Row index={index} id={row.id_empleado} nombre={row.nombre} tipo={row.tipo} setCurrentEmployee={setCurrentEmployee}/>
          ))}
        </tbody>
      </table>}
    </div>
  );
}

export default Empleados
