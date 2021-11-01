import React, {useState}  from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {render, cleanup, screen} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Formulario from '../Formulario';


//Test for Formulario.js

afterEach(() => {
    jest.clearAllMocks();
});


// test render without crashing
it('Debe renderizar el formulario', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Formulario />, div);
    ReactDOM.unmountComponentAtNode(div);
});

// test render with data
it('Debe renderizar el formulario con datos', () => {
    const datos = {paciente: 'el pepe'}
    const div = document.createElement('div');
    ReactDOM.render(<Formulario datos={datos} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

// test Formulario.js result after submit
it('Debe renderizar el formulario con datos', () => {
    const datos = {paciente: 'el pepe'}
    const div = document.createElement('div');
    ReactDOM.render(<Formulario datos={datos} />, div);
    const form = ReactDOM.findDOMNode(div);
    ReactDOM.unmountComponentAtNode(div);
});





