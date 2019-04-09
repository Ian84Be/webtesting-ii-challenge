import React from 'react';
import ReactDOM from 'react-dom';
import {cleanup, render, fireEvent} from 'react-testing-library';
import 'jest-dom/extend-expect';

import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Baseball', () => {
  afterEach(cleanup);

  describe('Strike Button', () => {
    it('should increase strikes display by 1', () => {
      const {getByText} = render(<App/>);
      expect(getByText(/strikes: 0/i));
      fireEvent.click(getByText('Strike'));
      expect(getByText(/strikes: 1/i));
    });

    it('should rollover strikes display to 0 after 3', () => {
      const {getByText,debug} = render(<App/>);
      debug();
      expect(getByText(/strikes: 0/i));
      fireEvent.click(getByText('Strike'));
      fireEvent.click(getByText('Strike'));
      fireEvent.click(getByText('Strike'));
      expect(getByText(/strikes: 3/i));
      fireEvent.click(getByText('Strike'));
      expect(getByText(/strikes: 0/i));
    });
  });

  describe('Ball Button', () => {
    it('should increase balls display by 1', () => {
      const {getByText} = render(<App/>);
      expect(getByText(/balls: 0/i));
      fireEvent.click(getByText('Ball'));
      expect(getByText(/balls: 1/i));
    });

    it('should rollover balls display to 0 after 4', () => {
      const {getByText,debug} = render(<App/>);
      debug();
      expect(getByText(/balls: 0/i));
      fireEvent.click(getByText('Ball'));
      fireEvent.click(getByText('Ball'));
      fireEvent.click(getByText('Ball'));
      fireEvent.click(getByText('Ball'));
      expect(getByText(/balls: 4/i));
      fireEvent.click(getByText('Ball'));
      expect(getByText(/balls: 0/i));
    });

  });
  
  describe('Foul Button', () => {
    it('should increase strikes no more than 2 if strikes = 0', () => {
      const {getByText} = render(<App/>);
      expect(getByText(/strikes: 0/i));
      fireEvent.click(getByText('Foul'));
      fireEvent.click(getByText('Foul'));
      expect(getByText(/strikes: 2/i));
      fireEvent.click(getByText('Foul'));
      expect(getByText(/strikes: 2/i));
    });
  });
});


