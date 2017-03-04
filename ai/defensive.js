'use strict'

const utils = require('./utils.js');

/*
 * Gives a cautious approximation of what space
 * will be unoccupied in n turns
 */
function safeSpace(board, turns) {
  // grid that could be occupied in n-turns
  var grid = createGrid(board.width, board.height);

  //FIXME want to avoid including yourself in these loops!
  // grab snakeheads
  var headsCurrent = board.snakes.map((snake) => {
    return snake.head;
  });

  // take away #turns from length of tail
  board.snakes.forEach((snake) => {
    var length = snake.coords.length;
    //preserve at least one cell in length so head and tail errors don't happen
    snake.coords.splice(Math.max(length - turns, 1), turns);
  });

  for(let head of headsCurrent) {
    for (var i = 1; i <= turns; i++) {
      cells = utils.equiDistantFromHead(head, i, board.height, board.width);
      cells.forEach((cell) => {
        gridBlock(cell, grid)
      })
    }
  }

  return grid;
}

module.exports = {
  safeSpace
}

//****** Private functions ******//

function gridOpen(coord, grid) {
    grid[coord[1]][coord[0]] = 0;
}

// puts a '1' at a coordinate on the grid
function gridBlock(coord, grid) {
    grid[coord[1]][coord[0]] = 1;
}

function createGrid(width, height) {
    var grid = [];
    for (var y = 0; y < height; y++) {
        grid[y] = [];
        for (var x = 0; x < width; x++) {
            grid[y][x] = 0;
        }
    }
    return grid;
}
