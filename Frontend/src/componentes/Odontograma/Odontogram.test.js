
import Odontogram from './Odontogram';
import React, {useState}  from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {render, cleanup, screen} from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";


// test('renders learn react link', () => {
//   const { getByText } = render(<Odontogram />);
//   const linkElement = getByText('11');
//   expect(linkElement).toBeInTheDocument();
// });
afterEach(cleanup);
it('renders learn react link', () => {
  const { getByText } = render(<Odontogram id_paciente= {2}/>);
  const linkElement = getByText('22');
  expect(linkElement).toBeInTheDocument();
});


it('renders learn react link', () => {
  const { getByText } = render(<Odontogram id_paciente= {2} />);
  const linkElement = getByText('33');
  expect(linkElement).toBeInTheDocument();
});
