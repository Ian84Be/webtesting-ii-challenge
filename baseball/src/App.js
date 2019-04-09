import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    balls: 0,
    strikes: 0,
  }
  render() {
    return (
      <div className="App">
        <div className="Display">
        <h2>Balls: {this.state.balls}</h2>
        <h2>Strikes: {this.state.strikes}</h2>
        </div>

        <div className="Dashboard">
        <button name="strikes" onClick={this.strike}>Strike</button>
        <button name="balls" onClick={this.ball}>Ball</button>
        <button onClick={this.foul}>Foul</button>
        <button onClick={this.hit}>Hit</button>
        </div>
      </div>
    );
  }
  strike = e => {
    let {strikes} = this.state;
    if (strikes < 3) {
      this.setState({
        ...this.state,
        strikes: strikes+=1
      })
    } else {
      this.setState({
        ...this.state,
        strikes: 0,
      })
    }
  }

  ball = e => {
    let {balls} = this.state;
    if (balls < 4) {
      this.setState({
        ...this.state,
        balls: balls+=1
      })
    } else {
      this.setState({
        ...this.state,
        balls: 0,
      })
    }
  }

  foul = e => {
    let {strikes} = this.state;
    if (strikes < 2) {
      this.setState({
        ...this.state,
        strikes: strikes+=1
      })
    }
  }

  hit = e => {
    this.setState({
      ...this.state,
      balls: 0,
      strikes: 0
    })
  }

} // APP

export default App;
