import React, { Component } from 'react';
import {cloneArray} from './shared/utility'
import Grid from './containers/Grid/Grid';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.seed();
    this.playButtonHandler();
  }

  // properties for setting up <Grid />
  rows = 30;
  columns = 50;
  speed = 100;

  state = {
    generation: 0,
    gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
    selectBox: null
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
        const neighbourCount = this.calculateNeighbors(modifiedGrid, i, j);
        console.log(neighbourCount);
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

  calculateNeighbors(grid, x, y) {
    let neighbours = 0;
    if (x > 0) if (grid[x - 1][y]) neighbours++;
    if (x > 0 && y > 0) if (grid[x - 1][y - 1]) neighbours++;
    if (x > 0 && y < this.columns - 1) if (grid[x - 1][y + 1]) neighbours++;
    if (y < this.columns - 1) if (grid[x][y + 1]) neighbours++;
    if (y > 0) if (grid[x][y - 1]) neighbours++;
    if (x < this.rows - 1) if (grid[x + 1][y]) neighbours++;
    if (x < this.rows - 1 && y > 0) if (grid[x + 1][y - 1]) neighbours++;
    if (x < this.rows - 1 && this.columns - 1) if (grid[x + 1][y + 1]) neighbours++;
    return neighbours;
  }



  render() {
    return (
      <div className="App">
        <h1> The Game of Life </h1>
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
