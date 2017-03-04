PF = require("pathfinding")

Snake = require("./Snake.js")

/**
 * Looks for set of cells that are or distance n from the head
 * Disregards all other snakes on board.  Might return negative indices.
 */
function _equiDistant(head, distance, height, width) {
  // First go around might have negative indices
  cells = []
  right = [head[0] + distance, head[1]]
  top = [head[0], head[1] - distance]
  left = [head[0] - distance, head[1]]
  bottom = [head[0], head[1] + distance]
  current = _.clone(right)

  // 1st quadrant
  while(!(current[0] == top[0] && current[1] == top[1])) {
    current[0] -= 1
    current[1] -= 1
    cells.push(_.clone(current))
  }
  // 2nd quadrant
  while(!(current[0] == left[0] && current[1] == left[1])) {
    current[0] -= 1
    current[1] += 1
    cells.push(_.clone(current))
  }
  // 3rd quadrant
  while(!(current[0] == bottom[0] && current[1] == bottom[1])) {
    current[0] += 1
    current[1] += 1
    cells.push(_.clone(current))
  }
  // 4th quadrant
  while(!(current[0] == right[0] && current[1] == right[1])) {
    current[0] += 1
    current[1] -= 1
    cells.push(_.clone(current))
  }
  return cells
}

/**
 * Looks for set of cells that are or distance n from the head
 * Disregards all other snakes on board.  Doesn't return negative indices.
 */
function equiDistantFromHead(head, distance, height, width) {
   cells = _equiDistant(head, distance, width, height);
   for (cell of cells) {
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
  var keys = {}
  if (i > 0) {
    keys.left = [i-1,j]
  }
  if (i < grid.width) {
    keys.right = [i+1,j]
  }
  if (j > 0) {
    keys.up = [i,j-1]
  }
  if (j < grid.height) {
    keys.down = [i,j+1]
  }
  for(l in keys) {
    if (grid[keys[l][0], keys[l][1]] == 1) {
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
}
