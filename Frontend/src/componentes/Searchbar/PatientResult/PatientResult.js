import React from 'react';

const PatientResult = (props) => {
  const items = props;
  
  return (
    <div className = "row paciente-busqueda">
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
