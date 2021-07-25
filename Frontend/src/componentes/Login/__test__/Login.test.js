import React, {useState}  from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {render, cleanup, screen} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Login from '../Login';

//Mocks token validation
function setToken(token){}

afterEach(cleanup);
it("Renders without crashing",()=>{
    
    const div = document.createElement("div");
    ReactDOM.render(<Login setToken={setToken} />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("Renders Login Correctly",() =>{
    
    const {getByTestId}= render(<Login setToken={setToken} />)
    expect(getByTestId('login-component')).toHaveTextContent("Inicio de Sesion")
});

it('Login is possible', async () => {
    
    render(<Login setToken={setToken} />);
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
});

it("Matches snapshot",() =>{
    
    const tree = renderer.create(<Login setToken={setToken} />).toJSON();
    expect(tree).toMatchSnapshot();
})
