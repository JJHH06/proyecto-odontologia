import React, { useEffect, useState } from 'react'
import Tooth from './Tooth'
import axios from 'axios'
import Diagnosis  from './Diagnosis'
function Odontogram(props) {
    const [summaryTitle, setSummaryTitle] = useState("Cargando...");
    const [tratamientos, setTratamientos] = useState([]);
    const [selectedPiece, setSelectedPiece] = useState({id_pieza: "0", bucal:[], lingual:[], distal:[], mesial:[], oclusal:[]});
    const [isToothInDiagnosis, setIsToothInDiagnosis] = useState(false);
    const [currentDiagnosisTooth, setCurrentDiagnosisTooth] = useState(0);

    function handleChangedPiece(newValue) {
      setSelectedPiece(newValue);
    }
    const teethConfiguration = [
        [18,17,16,15,14,13,12,11],
        [21,22,23,24,25,26,27,28],
        [55,54,53,52,51],
        [61,62,63,64,65],
        [85,84,83,82,81],
        [71,72,73,74,75],
        [48,47,46,45,44,43,42,41],
        [31,32,33,34,35,36,37,38]
    ]

    const getTratamientosBoca = () => {
        var data = JSON.stringify({
            "id_paciente": props.id_paciente || ""
          });
          
          var config = {
            method: 'post',
            url: 'http://198.211.103.50:5000/api/tratamiento_paciente/getTratamientos',
            headers: { 
              'Authorization': 'Bearer  ' + props.token, 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setSummaryTitle("Resumen Tratamientos")
            if(response.data.result.length === 0){
                setSummaryTitle("El paciente no posee tratamientos")
            }
            console.log('eltratamiento', response.data.result);
            setTratamientos(response.data.result);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    useEffect(()=>{
        getTratamientosBoca();
    },[])
    useEffect(()=>{
      console.log(selectedPiece)
    })


    return (
      <>
      {isToothInDiagnosis? <div><Diagnosis currentDiagnosisTooth={currentDiagnosisTooth} setIsToothInDiagnosis={setIsToothInDiagnosis} /></div>:
      <div>
      <div className="container">

        <div className="row py-3">
          <div className="col">
            <div className="container">
              <div className="row">
                {/* <div className="col-4"></div> */}

                {teethConfiguration[0].map((id) => (
                  <div className="col d-flex flex-column">
                    <Tooth setCurrentDiagnosisTooth = {setCurrentDiagnosisTooth} token={props.token} setIsToothInDiagnosis={setIsToothInDiagnosis} setSelectedPiece={handleChangedPiece} tooth_id={id} id_paciente={props.id_paciente} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="container">
              <div className="row">
                {teethConfiguration[1].map((id) => (
                  <div className="col d-flex flex-column">
                    <Tooth setCurrentDiagnosisTooth = {setCurrentDiagnosisTooth} token={props.token} setIsToothInDiagnosis={setIsToothInDiagnosis} setSelectedPiece={handleChangedPiece} tooth_id={id} id_paciente={props.id_paciente}/>
                  </div>
                ))}
                {/* <div className="col-4"></div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="row py-3">
          <div className="col">
            <div className="container">
              <div className="row">
                <div className="col-4"></div>

                {teethConfiguration[2].map((id) => (
                  <div className="col d-flex flex-column">
                    <Tooth setCurrentDiagnosisTooth = {setCurrentDiagnosisTooth} token={props.token} setIsToothInDiagnosis={setIsToothInDiagnosis} setSelectedPiece={handleChangedPiece} tooth_id={id} id_paciente={props.id_paciente}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="container">
              <div className="row">
                {teethConfiguration[3].map((id) => (
                  <div className="col d-flex flex-column">
                    <Tooth setCurrentDiagnosisTooth = {setCurrentDiagnosisTooth} token={props.token} setIsToothInDiagnosis={setIsToothInDiagnosis} setSelectedPiece={handleChangedPiece} tooth_id={id} id_paciente={props.id_paciente}/>
                  </div>
                ))}
                <div className="col-4"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="row py-3">
          <div className="col">
            <div className="container">
              <div className="row">
                <div className="col-4"></div>

                {teethConfiguration[4].map((id) => (
                  <div className="col d-flex flex-column">
                    <Tooth setCurrentDiagnosisTooth = {setCurrentDiagnosisTooth} token={props.token} setIsToothInDiagnosis={setIsToothInDiagnosis} setSelectedPiece={handleChangedPiece} tooth_id={id} id_paciente={props.id_paciente}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="container">
              <div className="row">
                {teethConfiguration[5].map((id) => (
                  <div className="col d-flex flex-column">
                    <Tooth setCurrentDiagnosisTooth = {setCurrentDiagnosisTooth} token={props.token} setIsToothInDiagnosis={setIsToothInDiagnosis} setSelectedPiece={handleChangedPiece} tooth_id={id} id_paciente={props.id_paciente}/>
                  </div>
                ))}
                <div className="col-4"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="row py-3">
          <div className="col">
            <div className="container">
              <div className="row">
                {/* <div className="col-4"></div> */}

                {teethConfiguration[6].map((id) => (
                  <div className="col d-flex flex-column">
                    <Tooth setCurrentDiagnosisTooth = {setCurrentDiagnosisTooth} token={props.token} setIsToothInDiagnosis={setIsToothInDiagnosis} setSelectedPiece={handleChangedPiece} tooth_id={id} id_paciente={props.id_paciente}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col">
            <div className="container">
              <div className="row">
                {teethConfiguration[7].map((id) => (
                  <div className="col d-flex flex-column">
                    <Tooth setCurrentDiagnosisTooth = {setCurrentDiagnosisTooth} token={props.token} setIsToothInDiagnosis={setIsToothInDiagnosis} setSelectedPiece={handleChangedPiece} tooth_id={id} id_paciente={props.id_paciente}/>
                  </div>
                ))}
                {/* <div className="col-4"></div> */}
              </div>
            </div>
          </div>
        </div>

        
      </div>
      { selectedPiece.id_pieza ==="0"?
      <div className='cuadro'>
                      <h3>{summaryTitle}</h3>
                      <ul>
                          {
                              tratamientos.map((tratamiento,index) =>(
                                  <li><p className='subtitulo'>{tratamiento.tratamiento+":"} <span>{tratamiento.count}</span></p> </li>
                          
                              ))
                          }
                          
                          
                      </ul>
                  </div>: 
                  <div className='cuadro'>
                  <h3>
                    {"Resumen pieza "+selectedPiece.id_pieza}
                  </h3>
                  <br/>
                  <h5>Oclusal</h5>
                  <ul>
                  {
                    selectedPiece.oclusal.map((tratamiento,index)=>(
                      <li><p > {tratamiento}</p> </li>
                    ))
                  }</ul>
                  <h5>Bucal</h5>
                  <ul>
                  {
                    selectedPiece.bucal.map((tratamiento,index)=>(
                      <li><p >{tratamiento}</p> </li>
                    ))
                  }</ul>
                  <h5>Lingual</h5>
                  <ul>
                  {
                    selectedPiece.lingual.map((tratamiento,index)=>(
                      <li><p > {tratamiento}</p> </li>
                    ))
                  }</ul>
                  <h5>Distal</h5>
                  <ul>
                  {
                    selectedPiece.distal.map((tratamiento,index)=>(
                      <li><p > {tratamiento}</p> </li>
                    ))
                  }</ul>
                  <h5>Mesial</h5>
                  <ul>
                  {
                    selectedPiece.mesial.map((tratamiento,index)=>(
                      <li><p > {tratamiento}</p> </li>
                    ))
                  }</ul>

                    </div>}
    </div>

      }
      
      </>
    );
}

export default Odontogram