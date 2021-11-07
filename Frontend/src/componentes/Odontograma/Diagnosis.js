import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./Diagnosis.css";
import tooth_mock from "./Assets/tooth.png";
import axios from 'axios';

let options = [
];

const calculateToothIndex = (pieza) => {
    let index = {bucal:3, lingual:1, distal:2, mesial:4, oclusal:0};
    if ((pieza >= 11 && pieza<=18) || (pieza >= 51 && pieza<=55)){
      index = {bucal:1, lingual:3, distal:4, mesial:2, oclusal:0};
      return index;


    } else if ((pieza >= 21 && pieza<=28) || (pieza >= 61 && pieza<=65)){
      index = {bucal:1, lingual:3, distal:2, mesial:4, oclusal:0};
      return index;
      

    } else if ((pieza >= 41 && pieza<=48) || (pieza >= 81 && pieza<=85)){
      index = {bucal:3, lingual:1, distal:4, mesial:2, oclusal:0};
      return index;
    } else{
        return index;
    }
}

function Diagnosis({id_paciente, token, setIsToothInDiagnosis, currentDiagnosisTooth }) {
let index = calculateToothIndex(currentDiagnosisTooth);

//   let defaultOclusal = [];
//   let defaultBucal = [];
//   let defaultDistal = [];
//   let defaultMesial = [];
//   let defaultLingual = [];

  //make the defaultOclusal state
    const [defaultOclusal, setDefaultOclusal] = useState([]);
    const [defaultBucal, setDefaultBucal] = useState([]);
    const [defaultDistal, setDefaultDistal] = useState([]);
    const [defaultMesial, setDefaultMesial] = useState([]);
    const [defaultLingual, setDefaultLingual] = useState([]);

  //state for the defaultToothDiagnosis
    const [defaultToothDiagnosis, setDefaultToothDiagnosis] = useState({})

    const handleCancel = () => {
        setIsToothInDiagnosis(false);
    }

    const handleStart = () => {
        let data = JSON.stringify({
            "no_pieza": currentDiagnosisTooth,
            "id_paciente": id_paciente
          });
          
          let config = {
            method: 'post',
            url: 'http://198.211.103.50:5000/api/tratamiento_paciente/getTratamientoByPieza',
            headers: { 
              'Authorization': 'Bearer  '+token, 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            const tratamientosPieza = response.data.result;
            //iterate every element from tratamientosPieza
            
            tratamientosPieza.forEach(tratamiento => {
                //if tratamiento is not already inside options, push it
                if (!options.some(option => option.value === tratamiento.id_tratamiento)){
                    options.push({
                        value: tratamiento.id_tratamiento,
                        label: tratamiento.nombre_tratamiento
                    })
                }

                //{bucal:3, lingual:1, distal:2, mesial:4, oclusal:0};
                if (tratamiento.seccion === index.bucal){
                    setDefaultBucal([...defaultBucal,{label: tratamiento.nombre_tratamiento, value: tratamiento.id_tratamiento}])

                } else if(tratamiento.seccion === index.lingual){
                    setDefaultLingual([...defaultLingual,{label: tratamiento.nombre_tratamiento, value: tratamiento.id_tratamiento}])
                } else if(tratamiento.seccion === index.distal){

                    setDefaultDistal([...defaultDistal,{label: tratamiento.nombre_tratamiento, value: tratamiento.id_tratamiento}])
                    
                    
                } else if(tratamiento.seccion === index.mesial){
                    setDefaultMesial([...defaultMesial,{label: tratamiento.nombre_tratamiento, value: tratamiento.id_tratamiento}])
                    
                } else if(tratamiento.seccion === index.oclusal){
                    setDefaultOclusal([...defaultOclusal,{label: tratamiento.nombre_tratamiento, value: tratamiento.id_tratamiento}])

                }
            });


            
            //check if defaultToothDiagnosis object is empty
            // if (Object.keys(defaultToothDiagnosis).length === 0){
            // }
            setDefaultToothDiagnosis(tratamientosPieza);
          })
          .catch(function (error) {
            console.log(error);
          });
    }


useEffect(() => {
    console.log('configuracion diente '+currentDiagnosisTooth+': ',index)
    handleStart();
}, []);

  return (
    <>{Object.keys(defaultToothDiagnosis).length === 0? <div>cargando</div>:<>
        <div className="row">
          <h1 className='diagnosis-title'>Diagnostico pieza {currentDiagnosisTooth}</h1>
          <div className="responsive-tooth-container col-md-4">
            <img src={tooth_mock} width="100" alt="tooth_mock" />
          </div>
          <div className="diagnosis-treatments-container col-md-8">
            {/* <div className="diagnosis-treatments-container-title">
              <h2>Tratamientos</h2>
            </div> */}
            <h3>Oclusal:</h3>
            <Select
              defaultValue={defaultOclusal}
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Seleccione tratamientos a realizar..."
              menuShouldScrollIntoView={false}
            />
            <h3>Bucal:</h3>
            <Select
              defaultValue={defaultBucal}
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Seleccione tratamientos a realizar..."
              menuShouldScrollIntoView={false}
            />
            <h3>Mesial:</h3>
            <Select
              defaultValue={defaultMesial}
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Seleccione tratamientos a realizar..."
              menuShouldScrollIntoView={false}
            />
  
            <h3>Lingual:</h3>
            <Select
              defaultValue={defaultLingual}
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Seleccione tratamientos a realizar..."
              menuShouldScrollIntoView={false}
            />
  
            <h3>Distal:</h3>
            <Select
              defaultValue={defaultDistal}
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Seleccione tratamientos a realizar..."
              menuShouldScrollIntoView={false}
            />
          </div>
          
        </div>
  
        {/* make bootstrap save and cancel butons in a row and centered horizontally */}
        <div className="row diagnosis-button-separator">
          <div className=" save-diagnosis-button col-md-6">
            <button className="btn btn-outline-danger" onClick={handleCancel}>Cancelar</button>
          </div>
          <div className="save-diagnosis-button col-md-6">
            <button className="btn btn-outline-primary btn-lg">Guardar</button>
          </div>
        </div>
      </>}</>
  );
}

export default Diagnosis;
