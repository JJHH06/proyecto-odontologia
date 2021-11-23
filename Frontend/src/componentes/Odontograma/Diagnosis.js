import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./Diagnosis.css";
import tooth_mock from "./Assets/tooth.png";
import mouth from "./Assets/mouth.png";
import axios from 'axios';



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

const getAllTreatments = async (token) => {
  let config = {
    method: 'get',
    url: 'http://198.211.103.50:5000/api/tratamiento_paciente/getAllTratamientos',
    headers: { 
      'Authorization': 'Bearer  '+token
    }
  };
   return await axios(config)
   .then(function (response) {
     return response.data.result
   })
  }

const deleteTreatments = async (token, treatments) => {
  return await axios.delete('http://198.211.103.50:5000/api/tratamiento_paciente/deleteTratamientos', {
    headers: {
      'Authorization': 'Bearer  '+token,
      'Content-Type': 'application/json'
    },
    data: {
      lista: treatments
    }
  }).then(function (response) {
    return response.data.result
  })

}
// make a function that uses the url http://198.211.103.50:5000/api/tratamiento_paciente/addTratamientos to make a post request , based on a list of treatments and an authorization header
const addTreatments = async (token, treatments) => {
  const config = {
    method: 'post',
    url: 'http://198.211.103.50:5000/api/tratamiento_paciente/addTratamientos',
    headers: { 
      'Authorization': 'Bearer  '+token, 
      'Content-Type': 'application/json'
    },
    data : JSON.stringify({lista: treatments})
  };
  
  return await axios(config)
  .then(function (response) {
    return response.data.result
  })
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
    const [options, setOptions] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [defaultToothDiagnosis, setDefaultToothDiagnosis] = useState({})

    const handleSave = async () => {
      // map every object from defaultOclusal and add a property id_paciente
      let oclusal = defaultOclusal.map(item => {
        return {idTratamiento: item.value, idPaciente: id_paciente, noPieza: currentDiagnosisTooth, seccion: index.oclusal };
      });
      let bucal = defaultBucal.map(item => {
        return {idTratamiento: item.value, idPaciente: id_paciente, noPieza: currentDiagnosisTooth, seccion: index.bucal };
      });
      let distal = defaultDistal.map(item => {
        return {idTratamiento: item.value, idPaciente: id_paciente, noPieza: currentDiagnosisTooth, seccion: index.distal };
      });
      let mesial = defaultMesial.map(item => {
        return {idTratamiento: item.value, idPaciente: id_paciente, noPieza: currentDiagnosisTooth, seccion: index.mesial };
      });
      let lingual = defaultLingual.map(item => {
        return {idTratamiento: item.value, idPaciente: id_paciente, noPieza: currentDiagnosisTooth, seccion: index.lingual };
      });

      //los datos seleccionados
      const dataInSelection = [...oclusal, ...bucal, ...distal, ...mesial, ...lingual];

      // Para eliminar los tratamientos desmarcados en el select
      let deletedItems = [];
      defaultToothDiagnosis.forEach(item => {
        
        if (!dataInSelection.some(element => {
                return element.idTratamiento == item.id_tratamiento && element.seccion == item.seccion;
              }))
        {
          deletedItems.push({idTratamientoPaciente: item.id_tratamiento_paciente});
        }
      });
      if (deletedItems.length > 0) {
        console.log('ITEMS a ELIMINAR',deletedItems);
        await deleteTreatments(token, deletedItems)
      }

      // create a list of the objects that are in dataInSelection but not in defaultToothDiagnosis
      const newItems = dataInSelection.filter(item => {
        return !defaultToothDiagnosis.some(element => {
          return element.id_tratamiento == item.idTratamiento && element.seccion == item.seccion;
        });
      });

      if (newItems.length > 0) {
        // add the new items to the database
        await addTreatments(token, newItems)
      }
      setIsToothInDiagnosis(false);
      
      
    }
  
    const handleCancel = () => {
        setIsToothInDiagnosis(false);
    }

    const handleStart = async() => {
        setOptions(await getAllTreatments(token));
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
          
          return await axios(config)
          .then(function (response) {
            const tratamientosPieza = response.data.result;
            //iterate every element from tratamientosPieza
            let defaultLoadBucal = [];
            let defaultLoadLingual = [];
            let defaultLoadDistal = [];
            let defaultLoadMesial = [];
            let defaultLoadOclusal = [];
            tratamientosPieza.forEach(tratamiento => {
                //if tratamiento is not already inside options, push it
                //{bucal:3, lingual:1, distal:2, mesial:4, oclusal:0};
                if (tratamiento.seccion === index.bucal){
                  defaultLoadBucal = [...defaultLoadBucal,{label: tratamiento.nombre_tratamiento, value: tratamiento.id_tratamiento}]

                } else if(tratamiento.seccion === index.lingual){
                  defaultLoadLingual =[...defaultLoadLingual,{label: tratamiento.nombre_tratamiento, value: tratamiento.id_tratamiento}]

                } else if(tratamiento.seccion === index.distal){

                  defaultLoadDistal =[...defaultLoadDistal,{label: tratamiento.nombre_tratamiento, value: tratamiento.id_tratamiento}]
                    
                    
                } else if(tratamiento.seccion === index.mesial){
                  defaultLoadMesial= [...defaultLoadMesial,{label: tratamiento.nombre_tratamiento, value: tratamiento.id_tratamiento}]
                    
                } else if(tratamiento.seccion === index.oclusal){
                  defaultLoadOclusal = [...defaultLoadOclusal,{label: tratamiento.nombre_tratamiento, value: tratamiento.id_tratamiento}]

                }
            });
            setDefaultBucal(defaultLoadBucal);
            setDefaultLingual(defaultLoadLingual);
            setDefaultDistal(defaultLoadDistal);
            setDefaultMesial(defaultLoadMesial);
            setDefaultOclusal(defaultLoadOclusal);


            
            //check if defaultToothDiagnosis object is empty
            // if (Object.keys(defaultToothDiagnosis).length === 0){
            // }
            setDefaultToothDiagnosis(tratamientosPieza);
            setIsDataLoaded(true);
            return response.data;
            
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
    <>{!isDataLoaded? <div>cargando</div>:<>
        <div className="row">
          <h1 className='diagnosis-title'>{currentDiagnosisTooth!==0?'Diagnostico pieza '+currentDiagnosisTooth:'Diagnostico bucal'}</h1>
          <div className="responsive-tooth-container col-md-4">
            <img src={currentDiagnosisTooth!==0?tooth_mock:mouth} width="100" alt="tooth_mock" />
          </div>
          <div className="diagnosis-treatments-container col-md-8">
            {/* <div className="diagnosis-treatments-container-title">
              <h2>Tratamientos</h2>
            </div> */}
            <h3 className={currentDiagnosisTooth!==0?'':'mt-5'}>{currentDiagnosisTooth!==0?'Oclusal:':'Tratamientos:'}</h3>
            <Select
              defaultValue={defaultOclusal}
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Seleccione tratamientos a realizar..."
              menuShouldScrollIntoView={false}
              className={currentDiagnosisTooth!==0?'':'mb-5'}
              onChange={setDefaultOclusal}
            />
            {currentDiagnosisTooth!==0?
            <>
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
              onChange={setDefaultBucal}
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
              onChange={setDefaultMesial}
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
              onChange={setDefaultLingual}
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
              onChange={setDefaultDistal}
            />
            </>: null}
          </div>
          
        </div>
  
        {/* make bootstrap save and cancel butons in a row and centered horizontally */}
        <div className="row diagnosis-button-separator">
          <div className=" save-diagnosis-button col-md-6">
            <button className="btn btn-outline-danger" onClick={handleCancel}>Cancelar</button>
          </div>
          <div className="save-diagnosis-button col-md-6">
            <button className="btn btn-outline-primary btn-lg" onClick={handleSave}>Guardar</button>
          </div>
        </div>
      </>}</>
  );
}

export default Diagnosis;
