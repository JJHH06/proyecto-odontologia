import {React, useState} from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'

const PatientResult = (props) => {
  const items = props;
  const history = useHistory();

  const handleFicha = () => {
    console.log('si se ejecuta');
    history.push({
      pathname: `/ficha`,
      state: items.paciente 
    });
  }
  
  return (
    <div data-testid="paciente-buscado" className = "row paciente-busqueda" onClick={handleFicha}>
      
                <div className="col">
                        {items.paciente.nombre}
                </div>
                <div className="col">
                {items.paciente.edad}

                </div>

                <div className="col">
                {items.paciente.telefono_celular}
                </div>
                    </div>
  );
};

export default PatientResult;
