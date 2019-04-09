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

  describe('BUTTON FUNCTIONS', () => {
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
        expect(getByText(/strikes: 2/i));
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
        expect(getByText(/balls: 3/i));
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
  
    describe('Hit Button', () => {
      it('should reset balls/strikes to 0', () => {
        const {getByText} = render(<App/>);
        expect(getByText(/strikes: 0/i));
        fireEvent.click(getByText('Foul'));
        expect(getByText(/strikes: 1/i));
        expect(getByText(/balls: 0/i));
        fireEvent.click(getByText('Ball'));
        expect(getByText(/balls: 1/i));
        fireEvent.click(getByText('Hit'));
        expect(getByText(/balls: 0/i));
        expect(getByText(/strikes: 0/i));
      });
    });
  });

  describe('TRACKING OUTS AND INNINGS', () => {
    it('should increase inning after 3 outs', () => {
      const {getByText} = render(<App/>);
      expect(getByText(/inning: 1/i));
      expect(getByText(/outs: 0/i));
      fireEvent.click(getByText('Strike'));
      fireEvent.click(getByText('Strike'));
      fireEvent.click(getByText('Strike'));
      expect(getByText(/outs: 1/i));
      fireEvent.click(getByText('Strike'));
      fireEvent.click(getByText('Strike'));
      fireEvent.click(getByText('Strike'));
      expect(getByText(/outs: 2/i));
      fireEvent.click(getByText('Strike'));
      fireEvent.click(getByText('Strike'));
      fireEvent.click(getByText('Strike'));
      expect(getByText(/outs: 0/i));
      expect(getByText(/inning: 2/i));
    });

    it('should display Game Over! after 3 outs in the 9th inning', () => {
      const {getByText} = render(<App/>);
      expect(getByText(/inning: 1/i));
      expect(getByText(/outs: 0/i));
      
      for (let i=2;i<10;i++) {
        const regex = new RegExp(`inning: ${i}`,'i');
        fireEvent.click(getByText('Strike'));
        fireEvent.click(getByText('Strike'));
        fireEvent.click(getByText('Strike'));
  
        fireEvent.click(getByText('Strike'));
        fireEvent.click(getByText('Strike'));
        fireEvent.click(getByText('Strike'));
        
        fireEvent.click(getByText('Strike'));
        fireEvent.click(getByText('Strike'));
        fireEvent.click(getByText('Strike'));
        expect(getByText(regex));
      }
      expect(getByText(/inning: 9/i));
      fireEvent.click(getByText('Strike'));
      fireEvent.click(getByText('Strike'));
      fireEvent.click(getByText('Strike'));

      fireEvent.click(getByText('Strike'));
      fireEvent.click(getByText('Strike'));
      fireEvent.click(getByText('Strike'));
      
      fireEvent.click(getByText('Strike'));
      fireEvent.click(getByText('Strike'));
      fireEvent.click(getByText('Strike'));
      expect(getByText(/game over/i));
    });
  });
}); // BASEBALL
