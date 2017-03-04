'use strict';
var PF = require('pathfinding');

module.exports = class Board {
    // TODO: make a nicer display this.displayGrid
    constructor(size) {
        this.grid = this.createGrid(size);
        this.size = size;
        this.snakes = [];
        this.food = [];
        this.displayGrid = this.createGrid(size);
    }
    /* find a path from a to b
       handles the grid cloning and other things
       (which the docs for pathfinding algorithm state is necessary)

       NOTE: if destination is a 1 on the grid, there are no paths.
       that is why it sets the partOfASnake to 0 in the cloned grid
    */

    pathFind(partOfASnake, destination) {

        var grid = this.cloneGrid();

        // NOTE: the destination is zeroed on grid before the search, if either are 1
        // the search algorithm wont work

        grid[partOfASnake[1]][partOfASnake[0]] = 0;

        var pfgrid = new PF.Grid(grid);
        var finder = new PF.AStarFinder();
        var path = finder.findPath(partOfASnake[0], partOfASnake[1], destination[0], destination[1], pfgrid);

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
            //console.log('path from food to tail? ');
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

    // zeroes a grid  (2d array of 0's,1's) of size sizexsize
    createGrid(size) {
        var grid = [];
        for (var x = 0; x < size; x++) {
            grid[x] = [];
            for (var y = 0; y < size; y++) {
                grid[x][y] = 0;
            }
        }
        return grid;
    }
    // check if a coordinate is open on the grid
    gridOpen(coord) {
        this.grid[coord[1]][coord[0]] == 0;
    }

    // puts a '1' at a coordinate on the PF grid
    gridBlock(coord) {
        this.grid[coord[1]][coord[0]] = 1;
    }
    // checks for a 0 on the PF grid at a coordinate [x,y]
    isGridOpen(coord) {

        return this.grid[coord[1]][coord[0]] == 0;
    }


    // probly a faster way to do this using Array.splice..
    cloneGrid() {
        var grid = this.grid;
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
    };
    // checks is a coordinate [x,y] is in bounds
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
        if (neighbors.length == 0) {
            return -1; // no neighbors :(
        }

        for (var coord of neighbors) {
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

};
