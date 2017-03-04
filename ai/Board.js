'use strict';

var Graph = require('graph.js/dist/graph.full.js');
var _ = require('underscore');
const Snake = require("./Snake.js");

//This loads all utility functions into the global namespace
//Might not want this eventually
_(global).extend(require('./utils'));

function addEdges(i, j, grid, graph, weight) {
    var keys = '';
    if (i > 0) {
        keys = [
            [i - 1, j] + '', [i, j] + ''
        ];
        graph.addEdge(...keys, weight(...keys, graph));
        keys = [
            [i, j] + '', [i - 1, j] + ''
        ];
        graph.addEdge(...keys, weight(...keys, graph));
    }
    if (i < grid.width) {
        keys = [
            [i + 1, j] + '', [i, j] + ''
        ];
        graph.addEdge(...keys, weight(...keys, graph));
        keys = [
            [i, j] + '', [i + 1, j] + ''
        ];
        graph.addEdge(...keys, weight(...keys, graph));
    }
    if (j > 0) {
        keys = [
            [i, j - 1] + '', [i, j] + ''
        ];
        graph.addEdge(...keys, weight(...keys, graph));
        keys = [
            [i, j] + '', [i, j - 1] + ''
        ];
        graph.addEdge(...keys, weight(...keys, graph));
    }
    if (j < grid.height) {
        keys = [
            [i, j + 1] + '', [i, j] + ''
        ];
        graph.addEdge(...keys, weight(...keys, graph));
        keys - [
            [i, j] + '', [i + 1, j] + ''
        ];
        graph.addEdge(...keys, weight(...keys, graph));
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
    if (graph.vertexValue(v2) === 0) {
        weight = 1;
    }
    return weight;
}

// scoped function, not exported
function addSnakes(snakes, grid) {
    for (var snake of snakes) {
        for (var snakeCoords of snake.coords) {
            var x, y;
            x = snakeCoords[0];
            y = snakeCoords[1];
            grid[y][x] = 1;
        }
    }
}

module.exports = class Board {
    constructor(body) {
        this.grid = this.createGrid(body.width, body.height);
        this.snakesOnlyGrid = this.createGrid(body.width, body.height);
        this.width = body.width;
        this.height = body.height;
        this.myID = body.you; // our snake's ID
        this.snakes = body.snakes.map((snakeData) => new Snake(body, snakeData.id));
        this.food = body.food;
        this.displayGrid = this.createGrid(body.width, body.height);


        addSnakes(this.snakes, this.grid);
        addSnakes(this.snakes, this.snakesOnlyGrid);

        Object.freeze(this.snakesOnlyGrid);
        this.snakesOnlyGrid.forEach((row) => Object.freeze(row));
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
        var graph = new Graph();
        //First, initialize all vertices b/c don't want to overwrite them
        grid.forEach((row, i) => {
            row.forEach((val, j) => {
                graph.addVertex([i, j] + '', val);
            });
        });

        grid.forEach((row, rowIndex) => {
            row.forEach((val, colIndex) => {
                addEdges(rowIndex, colIndex, grid, graph, simple);
            });
        });
        return graph;
    }

    /**
     * Should return an guestimation the probability of next cell being occupied on the nth turn:
     * - the length of the snake
     * - the initial location of the snake head.
     * @param {Array<Array>}
     *
     */
    naiveProbabilityLongTerm(grid, snake) {
        var heatmap = grid;
        //approximation of head being in cell
        //get lists of nodes that have the same manhatten distance from snake-head
        //They basically form a diamon-shape
    }



    // find a path from a to b
    // handles the grid cloning and other things
    // (which the docs for pathfinding algorithm state is necessary)
    pathFind(a, b) {
        var grid = this.cloneGrid();

        // NOTE: the destination is zeroed on grid before the search, if either are 1
        // the search algorithm wont work


        grid[b[1]][b[0]] = 0;

        var pfgrid = new PF.Grid(grid);
        var finder = new PF.AStarFinder(pfgrid);
        var path = finder.findPath(a[0], a[1], b[0], b[1], pfgrid);

        return path;
    }

    // for now Im just considering a path to food valid if theres a path to tail from it.
    // being picky about what food we're eating..
    //fromCoord is head
    getPathsToFood(head, tail) {
        var foodPaths = [];

        for (var food of this.food) {
            //
            var thisFoodPath = this.pathFind(head, food);

            if (this.hasPath(tail, food) && thisFoodPath.length > 0) {
                foodPaths.push(thisFoodPath);
            }
        }
        return foodPaths;
    }
    /*
      I call it snakePartCoord because the algorithm will temporarilty set a 0 on
      it's coordinate so it can pathfind. cant pathfind if it's set to 1
    */
    hasPath(snakePartCoord, toCoord) {
        var path = this.pathFind(snakePartCoord, toCoord);
        return path.length > 0;
    }
    // adds an aura to other snake heads - what else is there to say?
    // could try only adding the aura around heads of larger snakes than us,
    // but this way it helps with choke points too
    addAuraToOtherSnakeHeads(myID) {
        for (var snake of this.snakes) {
            if (snake.id !== myID) {
                for (var coord of this.getNeighborCoords(snake.coords[0])) {
                    this.gridBlock(coord);
                }
            }
        }
    }

    createGrid(width, height) {
        var grid = [];
        for (var y = 0; y < height; y++) {
            grid[y] = [];
            for (var x = 0; x < width; x++) {
                grid[y][x] = 0;
            }
        }
        return grid;
    }
    // check if a coordinate is open on the grid
    gridOpen(coord) {
        this.grid[coord[1]][coord[0]] = 0;
    }

    // puts a '1' at a coordinate on the PF grid
    gridBlock(coord) {
        this.grid[coord[1]][coord[0]] = 1;
    }
    // checks for a 0 on the PF grid at a coordinate [x,y]
    isGridOpen(coord) {
        return this.grid[coord[1]][coord[0]] === 0;
    }


    // probly a faster way to do this using Array.splice..
    cloneGrid(grid) {
        if (grid === undefined) {
            grid = this.grid;
        }
        var newgrid = [];

        for (var x = 0; x < grid.length; x++) {
            newgrid[x] = [];
            for (var y = 0; y < grid[x].length; y++) {
                newgrid[x][y] = grid[x][y];
            }
        }
        return newgrid;
    }
    // adds the snakes coordinates to the PF grid
    addSnakes(snakes) {
        this.snakes = snakes;
        for (var snake of snakes) {
            for (var snakeCoords of snake.coords) {
                var x, y;
                x = snakeCoords[0];
                y = snakeCoords[1];
                this.grid[y][x] = 1;

            }
        }

    }
    // this function does nothing for now, but can be useful for debugging
    addFood(foods) {
        this.food = foods;
        for (var food of foods) {
            var x, y;
            x = food[0];
            y = food[1];
            this.displayGrid = 'F';
            //this.grid[y][x] = 0;
        }
    }
    isInBounds(coord) {
        var x = coord[0];
        var y = coord[1];
        return (x >= 0 && x < this.size) &&
            (y >= 0 && y < this.size);
    }

    // given a coord ([x,y]), returns an array of neighboring coordinates
    // that aren't out of bounds
    getNeighborCoords(coord) {
        var neighbors = [];
        //var x, y;
        var x = coord[0];
        var y = coord[1];


        if (this.isInBounds([x + 1, y])) {
            neighbors.push([x + 1, y]);
        }

        if (this.isInBounds([x, y + 1])) {
            neighbors.push([x, y + 1]);
        }

        if (this.isInBounds([x - 1, y])) {
            neighbors.push([x - 1, y]);
        }

        if (this.isInBounds([x, y - 1])) {

            neighbors.push([x, y - 1]);
        }

        return neighbors;

    }

    // TODO : if other snake head is a target, take the 1 off it on grid
    // givena coord, returns array of neighbors that are
    getRandomFreeNeighbor(coord) {
        var neighbors = this.getNeighborCoords(coord);
        var result;
        if (neighbors.length === 0) {
            return -1; // no neighbors :(
        }

        for (var coordinate of neighbors) {
            if (this.isGridOpen(coord)) {
                result = coord;
                break;
            }
        }

        return result;
        //var randomIndex = Math.random() * neighbors.length;
        //return neighbors[randomIndex];
    }


    // example of cordinate is  [19,19]
    // finds smallest (except 0 length) array in a 2d array
    getShortestPathIndex(arrayOfPaths) {
        var shortestPath = 99999;
        var index = -1;
        var i = 0;
        for (var path of arrayOfPaths) {

            var len = path.length;
            if (len < shortestPath && len > 0) {
                shortestPath = len;
                index = i;
            }
            i++;
        }
        return index;
    }

    // describes the direction
    // only works if a move apart
    // eg 1,1 , 1,2
    directionBetweenCoords(coord1, coord2) {
        var x1 = coord1[0];
        var y1 = coord1[1];

        var x2 = coord2[0];
        var y2 = coord2[1];

        if (x2 > x1) {
            return 'right';
        }
        if (x1 > x2) {
            return 'left';
        }
        if (y2 > y1) {
            return 'down';
        }
        if (y1 > y2) {
            return 'up';
        }
    }

    print() {
        console.log(this.grid);
    }
};
