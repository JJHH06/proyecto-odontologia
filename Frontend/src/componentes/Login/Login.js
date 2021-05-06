/* eslint-disable prefer-template */
import React, { useState } from 'react';
import 'bootstrap';
import './Login.scss';
import Logotipo from '../../assets/FULL_COLOR.png';
import PropTypes from 'prop-types';

function Login({setToken}){
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = () => {
    const token = 'token123';
    if(username == 'christiandp@live.com' && password == '123456789'){
      setToken(token);
    }
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
                <label htmlFor="email">Email</label>
                <input type="email" name="email" className="form-control" onChange={e =>setUserName(e.target.value)} />
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
