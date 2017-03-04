var pathfindUtils = require('./pathfindUtils');

// Call this function with the snakesOnlyGrid -- no extras, nothing fancy
function sanityCheck(move, head, grid) {
  var destination = pathfindUtils.coordFromDirection(move, head);

  // if the destination is openand in bounds, go for it
  // otherwise, make an emergency move to a random open neighbour
  if (move && pathfindUtils.isCoordOpen(destination, grid) && pathfindUtils.isInBounds(destination, grid)) {
    console.log('Sane move.');
    return move;
  } else {
    console.log('Sanity failed! New plan...');
    var newCoord = pathfindUtils.getRandomFreeNeighbor(head, grid);
    var newMove = pathfindUtils.directionBetweenCoords(head, newCoord);
    return newMove;
  }
}

module.exports = sanityCheck;
