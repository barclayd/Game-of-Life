import React, { Component } from 'react';
import Grid from './containers/Grid/Grid';
import './App.css';

class App extends Component {

  // properties for setting up <Grid />
  rows = 30;
  columns = 50;
  speed = 100;

  state = {
    generation: 0,
    gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
    selectBox: null
  };



  render() {
    return (
      <div className="App">
        <h1> The Game of Life </h1>
        <Grid
            gridFull={this.state.gridFull}
            selectBox={this.state.selectBox}
            rows={this.rows}
            columns={this.columns}/>
        <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
}

export default App;
