/* eslint-disable prefer-template */
import React, { useState } from 'react';
import 'bootstrap';
import './Error404.scss';
import tooth from './assets/tooth1.png'
import { useHistory } from 'react-router-dom'


function Error404({}){
  const history = useHistory();
  const handleHome = () =>{
    history.push({
        pathname: `/home`
    });
}
  return (
    <div>
      <div className='container centrar-div'>
        <div className='center-title'>
          <h1>Error 404</h1>
        </div>
        <div className='center-image'>
          <img className='img-fluid' src={tooth} alt=""/>
        </div>
        <div className='center-title'>
          <h3>Al parecer, la pagina que estas buscando ha sido atacada por caries</h3>
        </div>
        <div className='center-title separar-btn'>
          <button className='boton-err' onClick={handleHome}>Volver al Inicio</button>
        </div>
      </div>
    </div>
  );
};

export default Error404;