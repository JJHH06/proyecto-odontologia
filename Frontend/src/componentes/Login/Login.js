/* eslint-disable prefer-template */
import React, { useState } from 'react';
import 'bootstrap';
import './Login.scss';
import Logotipo from '../../assets/FULL_COLOR.png';
import PropTypes from 'prop-types';
import axios from 'axios';

// const axios = require('axios');

// function loginConnection (email, pass){
//   var data = JSON.stringify({
//     "id_attemp": email,
//     "pass_attemp": pass
//   });
//   let respuesta = {}
  
//   var config = {
//     method: 'post',
//     url: 'http://localhost:5000/api/login/validate_login',
//     headers: { 
//       'Content-Type': 'application/json'
//     },
//     data : data
//   };
  
//   axios(config)
//   .then(function (response) {
//     respuesta = JSON.stringify(response.data)
//     console.log(JSON.stringify(response.data).validate_login);
//     //return JSON.stringify(JSON.stringify(response.data).validate_login)
    
    
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
// }

//loginConnection("XD","XDDDD")



function Login({setToken}){
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault()
    const token = 'token123';


    
  var data = JSON.stringify({
    "id_attemp": username,
    "pass_attemp": password
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:5000/api/login/validate_login',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    if (response.data.validate_login){
      setToken(token);
    }
    
  })
  .catch(function (error) {
    console.log(error);
  });





  }
  return (
    <div className="login">
      <div className="container">
        <div className="row content">
          <div className="col-md-6 mb-3">
            <img src={Logotipo} className="img-fluid posicion" alt="imagen" />
          </div>
          <div className="col-md-6">
            <h3 className="signin-text mb-3">Inicio de Sesion</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="text">Email</label>
                <input type="text" name="text" className="form-control" onChange={e =>setUserName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="espacio">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group form-check">
                <input
                  type="checkbox"
                  name="checkbox"
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="checkbox">
                  Remember Me
                </label>
              </div>
              <input
                type="submit"
                name="submit"
                value="Iniciar sesion"
                className="btn btn-class"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}


/*
        <input type='text' name='' placeholder='Username' />
        <input type='password' name='' placeholder= 'Password' />
        <input type='submit' name='' value= 'Login' />
*/
