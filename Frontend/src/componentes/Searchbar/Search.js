/* eslint-disable prefer-template */
import React, { useState } from 'react';
import './search.scss';
import Logotipo from '../../assets/BLANCO_Sin_Fondo.png';
import axios from 'axios';


// objeto de la calculadora
function Search() {
    const [pacientesBusqueda, setPacientesBusqueda] = useState("");
    const [pacientesEncontrados, setPacientesEncontrados] = useState([]);

    const handleSearch = (e) => {
        var data = JSON.stringify({
            "busqueda": pacientesBusqueda
          });
          
          var config = {
            method: 'post',
            url: 'http://localhost:5000/api/paciente/searchPaciente',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setPacientesEncontrados(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    return (
        <div className = "container">
           
            <div className = "row">
                <div className = "col-10 input-group input-search-patient">
                <input type="text" className="form-control" placeholder="Nombre del paciente" aria-label="Recipient's username with two button addons" onChange={e =>setPacientesBusqueda(e.target.value)}/>
                
                <button type="submit" onClick = {handleSearch} className="btn btn-secondary btn-lg">Buscar</button>
                </div>
            </div>
            
            <hr className="featurette-divider search-separator"/>
            <div className = "row header-busqueda">
                <div className="col">
                    <b>Nombre</b>
                </div>
                <div className="col">
                    <b>Edad</b>

                </div>

                <div className="col">
                    <b>Telefono</b>

                </div>
            </div>
            {
                pacientesEncontrados.map((paciente,index) =>(
                    <div className = "row paciente-busqueda">
                <div className="col">
                        {paciente.nombre}
                </div>
                <div className="col">
                {paciente.edad}

                </div>

                <div className="col">
                {paciente.telefono_celular}
                </div>
                    </div>
                ))
            }

        </div>
    );
}

export default Search;
