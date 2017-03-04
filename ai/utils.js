PF = require("pathfinding")

Snake = require("./Snake.js")


/**
 * Looks for set of cells that are or distance n from the head
 * Disregards all other snakes on board.  Might return negative indices.
 */
function _equiDistant(head, distance, height, width) {
  // First go around might have negative indices
  cells = [];
  right = [head[0] + distance, head[1]];
  top = [head[0], head[1] - distance];
  left = [head[0] - distance, head[1]];
  bottom = [head[0], head[1] + distance];
  current = _.clone(right);

  // 1st quadrant
  while(!(current[0] == top[0] && current[1] == top[1])) {
    current[0] -= 1;
    current[1] -= 1;
    cells.push(_.clone(current));
  }
  // 2nd quadrant
  while(!(current[0] == left[0] && current[1] == left[1])) {
    current[0] -= 1;
    current[1] += 1;
    cells.push(_.clone(current));
  }
  // 3rd quadrant
  while(!(current[0] == bottom[0] && current[1] == bottom[1])) {
    current[0] += 1;
    current[1] += 1;
    cells.push(_.clone(current));
  }
  // 4th quadrant
  while(!(current[0] == right[0] && current[1] == right[1])) {
    current[0] += 1;
    current[1] -= 1;
    cells.push(_.clone(current));
  }
  return cells;
}

/**
 * Looks for set of cells that are or distance n from the head
 * Disregards all other snakes on board.  Doesn't return negative indices.
 * @param {Array<number>} head - Snake.head
 * @param {number} distance
 * @param {height} height
 * @param {width} width
 */
function equiDistantFromHead(head, distance, height, width) {
   cells = _equiDistant(head, distance, width, height);
   for (var cell of cells) {
     cell[0] = Math.min(cell[0], height - 1);
     cell[1] = Math.min(cell[1], width - 1);
     cell[0] = Math.max(cell[0], 0);
     cell[1] = Math.max(cell[1], 0);
   }
   return cells;
}



/**
 * Search
 * First search all of moves keeping other snakes fixed.  Can go deeper
 * Then choose closest head, and if it is within the search depth*2,
*  and search all combinations of all snakes heads
 * mark all paths that give death as negative score
 */
function searchBoard() {

}

/**
 * Takes a look at where other snake's heads might be in the short term.
 * @param {Board} Board
 * @param {integer} turns - how many turns to look at into the future.
 * Keep in mind that we shouldn't look too far, because this is O(3^n).  Eek!
 */
function searchHeads(board, turns) {
  snakePaths = closestSnakes(board, turns).map((snakePath) => {snakePath.snake})
  // find all possible paths over n turns
  function search() {
    for (snake of snakes) {
      snakesMove()

    }
  //Given a snake is a place, look ahead one move
  function snakesMove(snakes) {
    var nextStepScenarios = []
    for (snake of snakes) {
      //Do all moves
      snake.move()
    }
  }
  }

}

/**
 * Find all snakes that you could have a head-on collision with within *distance* turns
 * Note: this assumes all other snakes are static when calculating number of
 * turns until collision between two snake heads.
 * @param board
 * @return {Array<Object>} an array of objects w/ {snake: Snake, path: Array<Point>} that are within distance*2 of
 * the given snakehead
 */
function closestSnakes(board, distance) {
  // Loop over all snakes and all within "striking distance"
  // Note that pathfinding takes and receives coords as (col, row),
  // but grid is (row, col)
  var grid = new PF.Grid(board.grid);
  var finder = new PF.AStarFinder();
  const mySnake = new Snake(board, board.you)
  const myHead = mySnake.head;
  var closeSnakes = []
  //Check out the distance to all other snakes
  for(snake of board.snakes) {
    if(snake.id !== board.you) {
      var strangerSnake = new Snake(board, snake.id)
      // Don't modify original grid
      var searchGrid = grid.clone()
      searchGrid.setWalkableAt(myHead[0], myHead[1], true)
      searchGrid.setWalkableAt(strangerSnake.head[0], strangerSnake.head[1], true)
      var path = finder.findPath(myHead[0], myHead[1], strangerSnake.head[0], strangerSnake.head[1], searchGrid);
      if(path.length <= distance*2+1 && path.length !== 0) {
        closeSnakes.push({snake: strangerSnake, path: path})
      }
    }
  }
  return closeSnakes.sort((snakePath) => -snakePath.path.length);
}

/**
 * Check if next move could result in checkmate.
 */
function checkMate() {

}

/**
 * Find shortest path by dijkstra's algorithm given changing graph values
 * @param {Array<integer>} startVertex, [l,m]
 * @param {Array<integer>} endVertex
 * @param {Graph} graph
 */
function dijkstra(board, startVertex, endVertex) {
  //Given startVertex, take neighbours
  function shortestCurrentPath() {

  }
}

/**
 * Finds shortests path, faster normally the dijkstra's algorithm
 * @param {Graph} graph
 * @param {Array<integer>} startVertex
 * @param {Array<integer>} endVertex
 *
 */
function aStar(graph, startVertex, endVertex) {
  var open = [];
  var neighbours = graph.verticesFrom(startVertex)


  function shortestCandidatePath() {

  }
}

/**
 * @param {integer} i - row index
 * @param {integer} j - col index
 * @param {Array<Array>} grid
 * @description Returns an object with values indices[l,m] of neighbours
 * that aren't other snakes
 */
function getNeighboursIndex(i, j, grid) {
  var keys = {};
  if (i > 0) {
    keys.left = [i-1,j];
  }
  if (i < grid.width) {
    keys.right = [i+1,j];
  }
  if (j > 0) {
    keys.up = [i,j-1];
  }
  if (j < grid.height) {
    keys.down = [i,j+1];
  }
  for (var l in keys) {
    if (grid[keys[l][0]][keys[l][1]] === 1) {
      delete keys[l]; //delete prevents us from iterating over as opposed to setting to undefined
    }
  }
  return keys;
}

/**
* Keeps track of when another snake eats, and
* if planning on going into last element of tail, abort!
* @param {Board} board
*/

function checkTailGrowth(board) {
 // If currently neighbouring a tail

 //Check the snakes head isn't right beside food!
}

/**
* Calculates taxi-car distance between two points
*/
function taxiDistance(startVertex, endVertex) {
 return Math.abs(startVertex[0] - endVertex[0]) + Math.abs(startVertex[1] - endVertex[1])
}

module.exports = {
  equiDistantFromHead,
  _equiDistant,
  getNeighboursIndex
};
