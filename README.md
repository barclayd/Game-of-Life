# Game of Life

Conway's Game of Life simulation built using React.

Deployed live: https://game-of-life-800a1.firebaseapp.com/

### Code style
  [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
    [![js-standard-style](https://img.shields.io/badge/deployed-live-blue.svg)](https://game-of-life-800a1.firebaseapp.com/)
    [![js-standard-style](https://img.shields.io/badge/deployed%20version-1.1.1-green.svg)](https://game-of-life-800a1.firebaseapp.com/)


### Demo

<p align="center">
  <img alt="Game of Life" src='https://user-images.githubusercontent.com/39765499/52443945-f6bb6400-2b1e-11e9-9ffe-a086265550fa.gif'>
  <img alt="Seeding" src='https://user-images.githubusercontent.com/39765499/52443942-f4590a00-2b1e-11e9-9ace-f2211fcd85ff.gif'>

<img width="798" alt="Demo" src="https://user-images.githubusercontent.com/39765499/52443935-f0c58300-2b1e-11e9-91b3-255c0f118ba7.png">
</p>

### Rules

1. A live cell with less than two live neighbours dies.

2. A live cell with two or three neighbours lives on to the next generation.

3. A live cell with more than tree neighbours dies.

4. A dead cell with exactly three neighbours is reborn and becomes a live cell.

More information about Conway's Game of Life can  be found [here](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

### Assumptions

* The board is a finite amount of space (rather than an infinite grid) and therefore cells can travel no further than the edges of the grid
* A coloured cell is a live cell
* A non-coloured cell is a dead cell

### How to Run

```
$ git clone https://github.com/barclayd/Game-of-Life.git
$ cd Game-of-Life
$ npm run start
```

This will open localhost:3000, displaying the web page

### How to Play

* Bring a given cell to life by clicking on a dead cell within in a grid
* Kill a cell by clicking on a live cell
* Use the buttons to toggle whether to seed or clear the grid, play or pause the iteration of generations and change time between generations to 'slow' or 'fast'
* Select a grid size from the drop-down selector in the top left hand corner
