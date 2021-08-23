import React, { useEffect, useState } from 'react'
import Tooth from './Tooth'
import axios from 'axios'
function Odontogram(props) {
    const [selectedPiece, setSelectedPiece] = useState("Cargando...");
    const [tratamientos, setTratamientos] = useState([]);

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
            url: 'http://localhost:5000/api/tratamiento/getTratamientos',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            setSelectedPiece("Resumen Tratamientos")
            if(response.data.result.length === 0){
                setSelectedPiece("El paciente no posee tratamientos")
            }
            setTratamientos(response.data.result);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    useEffect(()=>{
        getTratamientosBoca();
    },[])



    return (
      <div>
        <div className="container">

          <div className="row py-3">
            <div className="col">
              <div className="container">
                <div className="row">
                  {/* <div className="col-4"></div> */}

                  {teethConfiguration[0].map((id) => (
                    <div className="col d-flex flex-column">
                      <Tooth tooth_id={id} />
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
                      <Tooth tooth_id={id} />
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
                      <Tooth tooth_id={id} />
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
                      <Tooth tooth_id={id} />
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
                      <Tooth tooth_id={id} />
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
                      <Tooth tooth_id={id} />
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
                      <Tooth tooth_id={id} />
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
                      <Tooth tooth_id={id} />
                    </div>
                  ))}
                  {/* <div className="col-4"></div> */}
                </div>
              </div>
            </div>
          </div>

          
        </div>

        <div className='cuadro'>
                        <h3>{selectedPiece}</h3>
                        <ul>
                            {
                                tratamientos.map((tratamiento,index) =>(
                                    <li><p className='subtitulo'>{tratamiento.tratamiento+":"} <span>{tratamiento.count}</span></p> </li>
                            
                                ))
                            }
                            
                            
                        </ul>
                    </div>
      </div>
    );
}

export default Odontogram