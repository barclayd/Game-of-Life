import React, { Component } from 'react';
import {cloneArray} from './shared/utility'
import Grid from './containers/Grid/Grid';
import {createArray} from './shared/createArray';
import Buttons from './components/Buttons/Buttons';
import './App.css';

class App extends Component {

  // properties for setting up <Grid />
  rows = 30;
  columns = 50;
  speed = 500;

  state = {
    generation: 0,
    gridFull: createArray(this.rows, this.columns),
    selectBox: null
  };

  clear = () => {
    if (this.state.generation > 0) {
      this.pauseButtonHandler();
    }
   this.setState({
     generation: 0,
     gridFull: createArray(this.rows, this.columns),
      selectBox: null
   });
  };

  slow = () => {
    this.speed = 1000;
    this.playButtonHandler();
  };

  fast = () => {
    this.speed = 100;
    this.playButtonHandler();
  };


  selectBoxHandler = (row, col) => {
    // deep clone array
    let prevGrid = cloneArray(this.state.gridFull);
    prevGrid[row][col] = !prevGrid[row][col];
    this.setState({
      gridFull: prevGrid
    });
  };

  seed = () => {
    let prevGrid = cloneArray(this.state.gridFull);
    // iterate through grid to randomly turn boxes on or off
    for (let i=0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        // randomly turn on 1/4 of grid
        if ((Math.floor(Math.random() * 4) + 1) === 1) {
          prevGrid[i][j] = true;
        }
        this.setState({
          gridFull: prevGrid
        });
      }
    }
  };

  playButtonHandler = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.runIteration();
    }, this.speed);
  };

  pauseButtonHandler = () => {
    clearInterval(this.intervalId);
  };

  runIteration = () => {
    let currentGrid = this.state.gridFull;
    let modifiedGrid = cloneArray(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j=0; j < this.columns; j++) {
        const neighbourCount = this.countNeighbors(modifiedGrid, i, j);
        if(currentGrid[i][j] && (neighbourCount < 2 || neighbourCount > 3)) modifiedGrid[i][j] = false;
        if(!currentGrid[i][j] && (neighbourCount === 3)) modifiedGrid[i][j] = true;
      }
    }
    this.setState(prevState => {
      return {
        gridFull: modifiedGrid,
        generation: prevState.generation + 1
      }
    });
  };

  countNeighbors(grid, x, y) {
    let neighbours = 0;
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let row = (x + i + this.rows) % this.rows;
        let col = (y + j + this.columns) % this.columns;
        if (grid[row][col]) {
          neighbours++;
        }
      }
    }
    if (grid[x][y]) {
      neighbours -= 1;
    }
    return neighbours;
  }



  render() {
    return (
      <div className="App">
        <h1> The Game of Life </h1>
        <Buttons
            play={this.playButtonHandler}
            pause={this.pauseButtonHandler}
            slow={this.slow}
            fast={this.fast}
            clear={this.clear}
            seed={this.seed}
            gridSize={this.gridSize}
            />
        <Grid
            gridFull={this.state.gridFull}
            selectBox={this.state.selectBox}
            rows={this.rows}
            columns={this.columns}
            selectBoxHandler={this.selectBoxHandler}/>
        <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
}

export default App;
