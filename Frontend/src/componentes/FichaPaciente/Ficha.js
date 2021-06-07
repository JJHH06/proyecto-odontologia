
import React, { useState } from 'react';
import './Ficha.scss';


function Ficha({props}) {
    console.log(props);
    return (
        <div className= 'container estilo-ficha'>
            <h1>Jose Hurtarte</h1>
            <div className='row'>
                <div className='col-lg-6'>
                    <div className='cuadro'>
                        <div className='container-h3'>
                            <h3>Paciente</h3>
                        </div>

                        <ul>
                            <li><p className='subtitulo'>Estado Civil: <span>Soltero</span></p> </li>
                            <li><p className='subtitulo'>Edad: <span>20</span></p> </li>
                            <li><p className='subtitulo'>Fecha de Nacimiento: <span>06/04/2001</span></p> </li>
                            <li><p className='subtitulo'>Ocupacion: <span>Estudiante</span></p> </li>
                        </ul>
                    </div>
                </div>
                <div className='col-lg-6'>
                    <div className='cuadro'>
                        <div className='container-h3'>
                            <h3>Contacto</h3>
                        </div>
                        <ul>
                            <li><p className='subtitulo'>Direccion: <span>Direccion</span></p> </li>
                            <li><p className='subtitulo'>Email: <span>jjhh121106@gmail.com</span></p> </li>
                            <li><p className='subtitulo'>Telefono Celular: <span>5830-3030</span></p> </li>
                            <li><p className='subtitulo'>Telefono de Casa: <span>1234-3567</span></p> </li>
                        </ul>
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className='cuadro'>
                        <div className='container-h3 grande'>
                            <h3>Historial Medico</h3>
                        </div>
                        <ul>
                            <li><p className='subtitulo'>Recomendado Por: <span>Jose carlos</span></p> </li>
                            <li><p className='subtitulo'>Visita anterior al dentista: <span>01/01/2021</span></p> </li>
                            <li><p className='subtitulo'>Medico: <span>Dr simi</span></p> </li>
                            <li><p className='subtitulo'>Telefono medico: <span>1111-1111</span></p> </li>
                            <li><p className='subtitulo'>Contacto de emergencia: <span>elpepe</span></p> </li>
                            <li><p className='subtitulo'>Telefono medico: <span>1777-1777</span></p> </li>
                            
                        </ul>
                    </div>
                </div>
                <div className='col-lg-12'>
                    <div className='cuadro'>
                        <div className='container-h3'>
                            <h3>Cita</h3>
                        </div>
                        <ul>
                            <li><p className='subtitulo'>Motivo de consulta: <span>Dolor de muela</span></p> </li>
                            <li><p className='subtitulo'>Presupuesto: <span>No calculado</span></p> </li>
                            <li><p className='subtitulo'>Medicamentos: <span>Ninguno</span></p> </li>
                            
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Ficha;
