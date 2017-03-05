var utils = require('./utils.js');
var pathfindUtils = require('./pathfindUtils.js');

var finder = new PF.AStarFinder();

function longestOpenPath(head, grid) {
  // Get array of open coords
  var openCoords = [];
  for (var rowIndex in grid) {
    for (var coordIndex in grid[rowIndex]) {
      if (grid[rowIndex][coordIndex] === 0) {
        openCoords.push([coordIndex, rowIndex]);
      }
    }
  }

  // Loop over open coords and get paths
  var paths = [];
  for (var openCoord of openCoords) {
    var pfgrid = new PF.Grid(grid);
    paths.push(finder.findPath(head[0], head[1], openCoord[0], openCoord[1], pfgrid.clone()));
  }

  // get longest path
  var longest = [];
  for (var path of paths) {
    if (path.length > longest.length) {
      longest = path;
    }
  }

  return longest;
}

module.exports = longestOpenPath;
