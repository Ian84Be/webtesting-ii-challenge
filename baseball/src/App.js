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
        <button>Ball</button>
        <button>Foul</button>
        <button>Hit</button>
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

} // APP

export default App;
