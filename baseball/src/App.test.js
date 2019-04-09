import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent} from 'react-testing-library';
import 'jest-dom/extend-expect';

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Baseball', () => {

  describe('Strike Button', () => {
    it('should increase strikes by 1', () => {
      const {getByText} = render(<App/>);
      expect(getByText(/strikes: 0/i));
      fireEvent.click(getByText('Strike'));
      expect(getByText(/strikes: 1/i));
    });

  });
});


