import React, { useEffect, useState } from 'react'
import Tooth from './Tooth'
function Odontogram() {
    

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
                        <h3>Resumen General</h3>
                        <ul>
                            <li><p className='subtitulo'>Motivo de consulta: <span>cantidad</span></p> </li>
                            
                            
                        </ul>
                    </div>
      </div>
    );
}

export default Odontogram