import React, { Component } from 'react';
import {cloneArray} from './shared/utility'
import Grid from './containers/Grid/Grid';
import {createArray} from './shared/createArray';
import Buttons from './components/Buttons/Controls';
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

  gridSize = (size) => {
    switch (parseInt(size)) {
      case 1:
        this.rows = 10;
        this.columns = 20;
        break;
      case 2:
        this.rows = 25;
        this.columns = 35;
        break;
      case 3:
        this.rows = 50;
        this.columns = 70;
        break;
      default:
        this.rows = 50;
        this.columns = 70;
    }
    this.clear();
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
        const count = this.countNeighbors(currentGrid, i, j);
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
