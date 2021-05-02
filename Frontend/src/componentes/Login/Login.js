/* eslint-disable prefer-template */
import React, { useState } from 'react';
import './Login.css';

// objeto de la calculadora
function Login() {

  return (
    <form className='box'>
        <h1>Login</h1>
        <input type='text' name='' placeholder='Username' />
        <input type='password' name='' placeholder= 'Password' />
        <input type='submit' name='' value= 'Login' />
    </form>
  );
}

export default Login;
