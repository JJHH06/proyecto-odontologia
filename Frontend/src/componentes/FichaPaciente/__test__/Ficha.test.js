import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {render, cleanup, screen} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Ficha from '../Ficha';
import { jssPreset } from '@material-ui/styles';


jest.mock('react-router-dom', () => ({
    useLocation: jest.fn().mockReturnValue({
    location: {state:"Elpepe"},
      pathname: '/another-route',
      search: '',
      hash: '',
      state: null,
      key: '5nvxpbdafa',
    }),
}));

afterEach(cleanup);
it("Renders without crashing",()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Ficha/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("Renders Ficha Correctly",() =>{
    const {getByTestId}= render(<Ficha/>)
    expect(getByTestId('patient-form')).toHaveTextContent("Paciente")
});

it('Ficha result is displayed', async () => {
    render(<Ficha/>);
    expect(screen.getByTestId('patient-form')).toBeInTheDocument();
});

it("Matches snapshot",() =>{
    const tree = renderer.create(<Ficha/>).toJSON();
    expect(tree).toMatchSnapshot();
})
