/**
* Figure out which direction to go to get from coord1 to coord2
* only works if a move apart
* eg 1,1 , 1,2
*/
function directionBetweenCoords(coord1, coord2) {
  var x1 = coord1[0];
  var y1 = coord1[1];

  var x2 = coord2[0];
  var y2 = coord2[1];

  if (x2 > x1) { return "right"; }
  if (x1 > x2) { return "left"; }
  if (y2 > y1) { return "down"; }
  if (y1 > y2) { return "up"; }
}

/**
* Get destination coordinate from move up/down/left/right
* NOTE it will return the destination coord regardless of whether it is in bounds or open
* @param {String} direction - the move
* @param {Array} startingCoord - the coord you move from
*/
function coordFromDirection(direction, startingCoord) {
  var destination = [];
  if (direction == "up") {
    destination[0] = startingCoord[0];
    destination[1] = startingCoord[1] - 1;
  }
  if (direction == "down") {
    destination[0] = startingCoord[0];
    destination[1] = startingCoord[1] + 1;
  }
  if (direction == "right") {
    destination[0] = startingCoord[0] + 1;
    destination[1] = startingCoord[1];
  }
  if (direction == "left") {
    destination[0] = startingCoord[0] - 1;
    destination[1] = startingCoord[1];
  }
  return destination;
}

/**
* Check if a given coordinate is on the grid
* NOTE grid must have no extra information on it
* (must be [[0,0,0], [0,0,0], [0,0,0]] for a 3x3 grid)
* @param {Array} coord - the coordinate to check, [x,y]
* @param {Array<Array>} simpleGrid - the grid to check against
*/
function isInBounds(coord, simpleGrid) {
  var x = coord[0];
  var y = coord[1];
  return (x >= 0 && x < simpleGrid[0].length) &&
    (y >= 0 && y < simpleGrid.length);
}

/**
* Check to see if a coord is walkable (0)
* @param {Array} coord - The coordinate to check: [x,y]
* @param {Array<Array>} simpleGrid - the grid to check against
*/
function isCoordOpen(coord, simpleGrid) {
  return simpleGrid[coord[1]][coord[0]] === 0;
}

// given a coord ([x,y]), returns an array of neighboring coordinates
// that aren't out of bounds
function getNeighborCoords(coord, simpleGrid) {
    var neighbors = [];
    var x = coord[0];
    var y = coord[1];

    if (isInBounds([x + 1, y], simpleGrid)) {
        neighbors.push([x + 1, y]);
    }

    if (isInBounds([x, y + 1], simpleGrid)) {
        neighbors.push([x, y + 1]);
    }

    if (isInBounds([x - 1, y], simpleGrid)) {
        neighbors.push([x - 1, y]);
    }

    if (isInBounds([x, y - 1], simpleGrid)) {
        neighbors.push([x, y - 1]);
    }

    return neighbors;
}

/**
* Get a random open coordinate that can be moved to
* @param {Array} coord - the coordinate to start from
* @param {Array<Array>} simpleGrid - the grid to check against
* TODO : if other snake head is a target, take the 1 off it on grid
* given a coord, returns array of neighbors that are walkable
*/
function getRandomFreeNeighbor(coord, grid) {
  var neighbors = getNeighborCoords(coord, grid);
  var freeNeighbors = [];

  for (var coordinate of neighbors) {
    if (isCoordOpen(coordinate, grid)) {
      freeNeighbors.push(coordinate);
    }
  }

  if (freeNeighbors.length === 0) {
    return -1; // no neighbors :(
  }

  return freeNeighbors[Math.floor(Math.random() * freeNeighbors.length)];
}


module.exports = {
  directionBetweenCoords,
  coordFromDirection,
  isInBounds,
  isCoordOpen,
  getNeighborCoords,
  getRandomFreeNeighbor
};
