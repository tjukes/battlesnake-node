var Graph = require('graph.js/dist/graph.full.js');
var _ = require('underscore');

//This loads all utility functions into the global namespace
//Might not want this eventually
_(global).extend(require('./utils'))

function addEdges(i, j, grid, graph, weight) {
  var keys = '';
  if (i > 0) {
    keys = [[i-1,j]+'', [i,j]+'']
    graph.addEdge(...keys, weight(...keys, graph))
    keys = [[i,j]+'', [i-1,j]+'']
    graph.addEdge(...keys, weight(...keys, graph))
  }
  if (i < grid.width) {
    keys = [[i+1,j]+'', [i,j]+'']
    graph.addEdge(...keys, weight(...keys, graph))
    keys = [[i,j]+'', [i+1,j]+'']
    graph.addEdge(...keys, weight(...keys, graph))
  }
  if (j > 0) {
    keys = [[i,j-1]+'', [i,j]+'']
    graph.addEdge(...keys, weight(...keys, graph))
    keys = [[i,j]+'', [i,j-1]+'']
    graph.addEdge(...keys, weight(...keys, graph))
  }
  if (j < grid.height) {
    keys = [[i,j+1]+'', [i,j]+'']
    graph.addEdge(...keys, weight(...keys, graph))
    keys - [[i,j]+'', [i+1,j]+'']
    graph.addEdge(...keys, weight(...keys, graph))
  }

}

/**
  * Weighting scheme will assign 1 to edges going out
  * to vertices which are unoccupied
  * @param {string} v1 - edge starts at this vertex
  * @param {string} v2 - edge goes to this vertex
  * @return {number} weight
  */
function simple(v1, v2, graph) {
  var weight = 0;
  if(graph.vertexValue(v2) == 0) {
    weight = 1
  }
  return weight;
}

/** Class represents the board */
class Board {
  /**
 * Create a board object.
 * The board will keep track of the request information
 * and keep the game states and other useful useful information
 * infered from the current state.
 * @param {Object} body - the body of the request

 *
 */
  constructor(body) {
    this.height = body.height;
    this.width = body.width;
  }

  /** Creates a graph of the board.
   *  See API of [Graph.js](https://www.npmjs.com/package/graph.js#Graph+toJSON)
   * @param {Array<Array>} grid - the grid of snakes
   * @param {function} [rule=simple] -
   * This is how we assign weights to edges between the cells of the board.
   * default sets all edges to open vertices value 0) w/ edge weight 1, 0 otherwise
   * @returns {Graph}
   */
  createGraph(grid, rule = simple) {
    var graph = new Graph()
    //First, initialize all vertices b/c don't want to overwrite them
    grid.forEach((row, i) => {
      row.forEach((val, j) => {
        graph.addVertex([i,j]+'', val)
      });
    });

    grid.forEach((row, rowIndex) => {
      row.forEach((val, colIndex) => {
        addEdges(rowIndex, colIndex, grid, graph, simple)
      });
    });
    return graph;
  }
}

module.exports = Board
