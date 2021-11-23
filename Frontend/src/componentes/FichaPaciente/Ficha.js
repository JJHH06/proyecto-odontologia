
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import './Ficha.scss';
import Odontogram from "../Odontograma/Odontogram"
import Presupuesto from '../Presupuesto/Presupuesto';
import { PDFExport } from "@progress/kendo-react-pdf";

function Ficha({token}) {
    const pdfExportComponent = React.useRef(null);
    
    const location = useLocation();
    // console.log(location.state);
    //console.log(props.location.state)
    
    

    return (
        <>
         {location? <div  className= 'container estilo-ficha'>
            <h1>{location.state.nombre}</h1>
            <div className='row'>
                <div className='col-lg-6'>
                    <div className='cuadro'>
                        <div className='container-h3'>
                            <h3>Paciente</h3>
                        </div>

                        <ul>
                            <li><p className='subtitulo'>Estado Civil: <span>{location.state.estado_civil}</span></p> </li>
                            <li><p className='subtitulo'>Edad: <span>{location.state.edad}</span></p> </li>
                            <li><p className='subtitulo'>Fecha de Nacimiento: <span>{location.state.fecha_nacimiento}</span></p> </li>
                            <li><p className='subtitulo'>Ocupacion: <span>{location.state.ocupacion}</span></p> </li>
                        </ul>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='cuadro'>
                        <div className='container-h3'>
                            <h3>Contacto</h3>
                        </div>
                        <ul>
                            <li><p className='subtitulo'>Direccion: <span>{location.state.direccion}</span></p> </li>
                            <li><p className='subtitulo'>Email: <span>{location.state.email}</span></p> </li>
                            <li><p className='subtitulo'>Telefono Celular: <span>{location.state.telefono_celular}</span></p> </li>
                            <li><p className='subtitulo'>Telefono de Casa: <span>{location.state.telefono_casa}</span></p> </li>
                        </ul>
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className='cuadro'>
                        <div className='container-h3 grande'>
                            <h3>Historial Medico</h3>
                        </div>
                        <ul>
                            <li><p className='subtitulo'>Recomendado Por: <span>{location.state.recomendado_por}</span></p> </li>
                            <li><p className='subtitulo'>Visita anterior al dentista: <span>{location.state.visita_anterior_dentista}</span></p> </li>
                            <li><p className='subtitulo'>Medico: <span>{location.state.medico}</span></p> </li>
                            <li><p className='subtitulo'>Telefono medico: <span>{location.state.telefono_medico}</span></p> </li>
                            <li><p className='subtitulo'>Contacto de emergencia: <span>{location.state.contacto_emergencia}</span></p> </li>
                            <li><p className='subtitulo'>Telefono medico: <span>{location.state.telefono_medico}</span></p> </li>
                            
                            
                        </ul>
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className='cuadro'>
                        <div className='container-h3'>
                            <h3>Cita</h3>
                        </div>
                        <ul>
                            <li><p className='subtitulo'>Motivo de consulta: <span>{location.state.motivo_consulta}</span></p> </li>
                            <li><p className='subtitulo'>Presupuesto: <span>No calculado</span></p> </li>
                            <li><p className='subtitulo'>Medicamentos: <span>{location.state.medicamentos}</span></p> </li>
                            <li><h3>Condiciones preexistentes</h3></li>
                            <li><ul>
                            {
                                location.state.padecimientos.map((padecimiento,index) =>(
                                    <li><p>{padecimiento}</p></li>
                                ))
                            }
                            </ul></li>
                            
                        </ul>
                    </div>
                    <div className='odontogram-container cuadro'>
                        <Odontogram id_paciente={location.state.id_paciente} token={token}/>
                    </div>
                    {/*create button to calculate the estimate price */}
                    
                    
                    <div className='mb-4 mt-4 container'>
                        <div className='row'>
                            <div className='col-lg-12 text-center'>
                            <button className='btn btn-success' onClick={(e)=>{
                                if (pdfExportComponent.current) {
                                    pdfExportComponent.current.save();
                                  }
                            }}>
                                Generar presupuesto
                            </button>

                            
                            </div>
                        </div>
                    </div>
                    <div style={{
          position: "absolute",
          left: "-1000px",
          top: 0,
        }}>
                    <PDFExport paperSize="A3" fileName={location.state.nombre+'.pdf'} margin="0cm" ref={pdfExportComponent}>
                        <Presupuesto nombre={location.state.nombre}/>
        </PDFExport>

</div>
                    


                </div>
                
            </div>
        </div>: <div data-testid="patient-form" >Paciente no disponible, La vuelve a la pantalla de inicio</div>}</>
    );
}

export default Ficha;
