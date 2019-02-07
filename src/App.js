import React, { Component } from 'react';
import {cloneArray} from './shared/utility'
import Grid from './containers/Grid/Grid';
import {createArray, newArray} from './shared/createArray';
import Buttons from './components/Buttons/Buttons';
import * as classes from './App.module.css';

class App extends Component {

  // properties for setting up <Grid />
  rows = 30;
  columns = 50;
  speed = 500;

  state = {
    generation: 0,
    gridFull: createArray(this.rows, this.columns)
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
        // randomly turn on 1/5 of grid
        if ((Math.floor(Math.random() * 5) + 1) === 1) {
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
      for (let j = 0; j < this.columns; j++) {
        let count = 0;
        if (i > 0) if (currentGrid[i - 1][j]) count++;
        if (i > 0 && j > 0) if (currentGrid[i - 1][j - 1]) count++;
        if (i > 0 && j < this.columns - 1) if (currentGrid[i - 1][j + 1]) count++;
        if (j < this.columns - 1) if (currentGrid[i][j + 1]) count++;
        if (j > 0) if (currentGrid[i][j - 1]) count++;
        if (i < this.rows - 1) if (currentGrid[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (currentGrid[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && this.columns - 1) if (currentGrid[i + 1][j + 1]) count++;
        if (currentGrid[i][j] && (count < 2 || count > 3)) modifiedGrid[i][j] = false;
        if (!currentGrid[i][j] && count === 3) modifiedGrid[i][j] = true;
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
          neighbours += 1;
        }
      }
    }
    if (grid[x][y]) {
      neighbours -= 1;
    }
    console.log(neighbours);

    return neighbours;
  }



  render() {
    return (
      <>
        <h1> The Game of Life </h1>
        <div className={classes.content}>
          <Buttons
              play={this.playButtonHandler}
              pause={this.pauseButtonHandler}
              slow={this.slow}
              fast={this.fast}
              clear={this.clear}
              seed={this.seed}
              gridSize={this.gridSize}
          />
          <h3 className={classes.header}>Generations: {this.state.generation}</h3>
        </div>
        <Grid
            gridFull={this.state.gridFull}
            selectBox={this.state.selectBox}
            rows={this.rows}
            columns={this.columns}
            selectBoxHandler={this.selectBoxHandler}/>
      </>
    );
  }
}

export default App;
