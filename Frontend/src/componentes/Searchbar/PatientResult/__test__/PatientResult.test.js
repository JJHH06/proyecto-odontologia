import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {render, cleanup, screen} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import PatientResult from '../PatientResult';

const TESTPATIENT = {edad: 12, nombre: "TestPatient", telefono_celular: "12345678"}


afterEach(cleanup);
it("Renders without crashing",()=>{
    const div = document.createElement("div");
    ReactDOM.render(<PatientResult paciente = {TESTPATIENT}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("Renders PatientResult Correctly",() =>{
    const {getByTestId}= render(<PatientResult paciente = {TESTPATIENT}/>)
    expect(getByTestId('paciente-buscado')).toHaveTextContent("TestPatient")
});

it('PatientResult results are displayed', async () => {
    render(<PatientResult paciente = {TESTPATIENT}/>);
    expect(screen.getByTestId('paciente-buscado')).toBeInTheDocument();
});

it("Matches snapshot",() =>{
    const tree = renderer.create(<PatientResult paciente = {TESTPATIENT}/>).toJSON();
    expect(tree).toMatchSnapshot();
})
