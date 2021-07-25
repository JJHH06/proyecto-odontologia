import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {render, cleanup, screen} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Formulario from '../Formulario';



afterEach(cleanup);
it("Renders without crashing",()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Formulario/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("Renders Formulario Correctly",() =>{
    const {getByTestId}= render(<Formulario/>)
    expect(getByTestId('patient-form')).toHaveTextContent("Paciente")
});

it('Formulario result is displayed', async () => {
    render(<Formulario/>);
    expect(screen.getByTestId('patient-form')).toBeInTheDocument();
});

it("Matches snapshot",() =>{
    const tree = renderer.create(<Formulario/>).toJSON();
    expect(tree).toMatchSnapshot();
})
