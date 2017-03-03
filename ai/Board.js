'use strict';
module.exports = class Board {
    constructor(body) {
        this.grid = this.createGrid(body.width, body.height);
        this.snakesOnlyGrid = this.createGrid(body.width, body.height);
        this.width = body.width;
        this.height = body.height;
        this.snakes = body.snakes;
        this.food = [];
        this.displayGrid = this.createGrid(body.width, body.height);


    }
    // find a path from a to b
    // handles the grid cloning and other things
    // (which the docs for pathfinding algorithm state is necessary)
    pathFind(a, b, pretendDestinationOpen = false) {
        var PF = require('pathfinding');
        var grid = this.cloneGrid();

        // NOTE: the coords a and b are zeroed on the grid before the search, if either are 1
        // the search algorithm wont work
        grid[a[1]][a[0]] = 0;

        if (pretendDestinationOpen) {
            grid[b[1]][b[0]] = 0;

        }

        var pfgrid = new PF.Grid(grid);
        var finder = new PF.AStarFinder();
        var path = finder.findPath(a[0], a[1], b[0], b[1], pfgrid);

        return path;
    }

    // for now Im just considering a path to food valid if theres a path to tail from it.
    // being picky about what food we're eating..
    //fromCoord is head
    getPathsToFood(head, tail) {
        var foodPaths = [];

        for (var food of this.food) {
            // make sure theres a path to tail first
            var thisFoodPath = this.pathFind(head, food, false);
            //console.log('path from food to tail? ');
            if (this.hasPath(food, tail, true)) {
                foodPaths.push(thisFoodPath);
            }
        }
        return foodPaths;
    }

    hasPath(fromCoord, toCoord, pretendDestinationOpen = false) {
        var path = this.pathFind(fromCoord, toCoord, pretendDestinationOpen);
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

    gridOpen(coord) {
        this.grid[coord[1]][coord[0]] == 0;
    }

    // puts a '1' at a coordinate on the grid
    gridBlock(coord) {
        this.grid[coord[1]][coord[0]] = 1;
    }

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

    addSnakes(snakes) {
        for (var snake of snakes) {
            for (var snakeCoords of snake.coords) {
                var x, y;
                x = snakeCoords[0];
                y = snakeCoords[1];
                this.grid[y][x] = 1;
                this.snakesOnlyGrid[y][x] = 1;
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


    // example of fromCoord/toCoord is array [19,19]
    // so for this function, we are going to set the source & destination to 0 on the temp grid,
    // otherwise there for sure wont be a path
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


    // only works if a move apart
    // eg 1,1 , 1,2
    directionBetweenCoords(coord1, coord2) {
        var x1 = coord1[0];
        var y1 = coord1[1];

        var x2 = coord2[0];
        var y2 = coord2[1];
        //console.log('from ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2);

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
        /*
    for (var y = 0; y < this.size; y++) {
    var row = [];
    for (var x = 0; x < this.size; x++) {
    row.push(this.grid[x][y]);
  }
  console.log(row);
}*/
    }

    // eg 1,1 , 1,2
    directionBetweenCoords(coord1, coord2) {
        var x1 = coord1[0];
        var y1 = coord1[1];

        var x2 = coord2[0];
        var y2 = coord2[1];
        //console.log('from ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2);

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
        /*
    for (var y = 0; y < this.size; y++) {
    var row = [];
    for (var x = 0; x < this.size; x++) {
    row.push(this.grid[x][y]);
  }
  console.log(row);
}*/
    }
};
