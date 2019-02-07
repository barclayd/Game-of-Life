import React, {Component} from 'react';
import {cloneArray} from './shared/utility'
import Grid from './components/Grid/Grid';
import {createArray} from './shared/utility';
import Buttons from './components/Controls/Controls';
import * as settings from './shared/Game';
import * as classes from './App.module.css';

class App extends Component {
  // properties for setting up <Grid />
  rows = settings.rows;
  columns = settings.columns;
  speed = settings.speed;

  state = {
    generation: 0,
    grid: createArray(this.rows, this.columns)
  };

  clear = () => {
    if (this.state.generation > 0) {
      this.pauseButtonHandler();
    }
    this.setState({
      generation: 0,
      grid: createArray(this.rows, this.columns),
      selectCell: null
    });
  };

  gridSizeHandler = (size) => {
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


  selectCellHandler = (row, col) => {
    let prevGrid = cloneArray(this.state.grid);
    prevGrid[row][col] = !prevGrid[row][col];
    this.setState({
      grid: prevGrid
    });
  };

  seed = () => {
    let prevGrid = cloneArray(this.state.grid);
    // iterate through grid to randomly turn cells on or off
    for (let i=0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        // randomly turn on 1/5 of grid
        if ((Math.floor(Math.random() * 5) + 1) === 1) {
          prevGrid[i][j] = true;
        }
        this.setState({
          grid: prevGrid
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
    let currentGrid = this.state.grid;
    let modifiedGrid = cloneArray(this.state.grid);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const count = this.countNeighbors(currentGrid, i, j);
        if (currentGrid[i][j] && (count < 2 || count > 3)) modifiedGrid[i][j] = false;
        if (!currentGrid[i][j] && count === 3) modifiedGrid[i][j] = true;
      }
    }
    this.setState(prevState => {
      return {
        grid: modifiedGrid,
        generation: prevState.generation + 1
      }
    });
  };

  countNeighbors = (grid, x, y) => {
    let neighbours = 0;
    for (let i = -1; i < 2; i++) {
      for(let j = -1; j < 2; j++) {
        let row = (x + i + this.rows) % this.rows;
        let col = (y + j + this.columns) % this.columns;
        neighbours += grid[row][col];
      }
    }
    neighbours -= grid[x][y];
    return neighbours;
  };

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
                gridSize={this.gridSizeHandler}
            />
            <h3 className={classes.header}>Generations: {this.state.generation}</h3>
          </div>
          <Grid
              grid={this.state.grid}
              selectCell={this.state.selectCell}
              rows={this.rows}
              columns={this.columns}
              selectCellHandler={this.selectCellHandler}/>
        </>
    );
  }
}

export default App;
