import React, { Component } from 'react';
import Grid from './containers/Grid/Grid';
import './App.css';

class App extends Component {

  state = {
    generation: 0
  };

  render() {
    return (
      <div className="App">
        <h1> The Game of Life </h1>
        <Grid />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
}

export default App;
