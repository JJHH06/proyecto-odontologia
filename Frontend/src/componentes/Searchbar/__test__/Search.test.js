import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {render, cleanup, screen, fireEvent, waitFor} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Search from '../Search';




afterEach(cleanup);
it("Renders without crashing",()=>{
    const div = document.createElement("div");
    ReactDOM.render(<Search/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("Renders Search Correctly",() =>{
    const {getByTestId}= render(<Search/>)
    expect(getByTestId('search-patient')).toHaveTextContent("Buscar")
});

it('Search results are displayed', async () => {
    render(<Search />);
    expect(screen.getByTestId('cargando-info')).toBeInTheDocument();
});

it("Matches snapshot",() =>{
    const tree = renderer.create(<Search/>).toJSON();
    expect(tree).toMatchSnapshot();
})




