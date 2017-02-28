var express = require('express');
var router = express.Router();
var Board = require('../src/gridBuilder.js');
var PF = require('pathfinding');

// a few globals for now..
var grid = [];
var board;
var reqBody = [];

var numSnakes = 0;
// Handle POST request to '/start'
router.post('/start', function(req, res) {
    numSnakes++;
    // Response data
    var returnData = {
        color: getRandomColor(),
        name: "Trump Snake #" + numSnakes,
        head_url: "http://www.placecage.com/c/200/200", // optional, but encouraged!
        taunt: "Let's do thisss thang!", // optional, but encouraged!
    };
    return res.json(returnData);
});

// Handle POST request to '/move'
router.post('/move', function(req, res) {

    reqBody = req.body;
    try {

        var me = findMySnake();

        var head = [me.coords[0][0], me.coords[0][1]];
        var tail = [me.coords[me.coords.length - 1][0], me.coords[me.coords.length - 1][1]];

        board = new Board(reqBody.height);
        board.addSnakes(reqBody.snakes);

        // there might not be food sometime..
        board.addFood(reqBody.food);

        // of course add the auras..
        addAuraToOtherSnakeHeads();

        var myPathsToFood = getPathsToFood(head, tail);

        board.print();

        //console.log('Paths to food:');
        //console.log(myPathsToFood);

        console.log('My Head @ ' + head);
        console.log('My Tail @ ' + tail);

        var gotAMove = false;
        if (myPathsToFood.length > 0) {

            var myFoodTargetIndex = getShortestPathIndex(myPathsToFood);
            var myFoodPath = myPathsToFood[myFoodTargetIndex];

            if (myFoodPath) {

                // is there food?
                console.log('Heading to food @ ' + reqBody.food[myFoodTargetIndex]);

                myFoodPath.shift();
                var nextCoordToFood = myFoodPath.shift();
                var theMove = directionBetweenCoords(head, nextCoordToFood);
                gotAMove = true;
            }
        }
        if (!gotAMove) {
            console.log('I HAVE NO PATH TO FOOD - I AM LOST');
            // just move randomly as long as the place I move to has path to tail.
            // otherwise who knows..

            var target = getRandomFreeNeighbor(head);

            console.log('HEADED TO TARGET ' + target);
            var theMove = directionBetweenCoords(head, target);
        }

        console.log('I think I will move ' + theMove);
        console.log('-------------------------------------------------');

    } catch (err) {
        if (err.message) {
            console.log('\nMessage: ' + err.message);
        }
        if (err.stack) {
            console.log('\nStacktrace:');
            console.log('====================');
            console.log(err.stack);
        }
    }

    var responseData = {

        move: theMove, // one of: ['up','down','left','right']
        taunt: 'Outta my way, snake!', // optional, but encouraged!
    };

    return res.json(responseData);
});

function isInBounds(coord) {
    var x = coord[0];
    var y = coord[1];
    return (x >= 0 && x < reqBody.height) &&
        (y >= 0 && y < reqBody.height);
}

// given a coord ([x,y]), returns an array of neighboring coordinates
// that aren't out of bounds
function getNeighborCoords(coord) {
    var neighbors = [];

    x = coord[0];
    y = coord[1];

    if (isInBounds([x + 1, y])) {
        neighbors.push([x + 1, y]);
    }

    if (isInBounds([x, y + 1])) {
        neighbors.push([x, y + 1]);
    }

    if (isInBounds([x - 1, y])) {
        neighbors.push([x - 1, y]);
    }

    if (isInBounds([x, y - 1])) {

        neighbors.push([x, y - 1]);
    }

    return neighbors;

}
// adds an aura to other snake heads - what else is there to say?
// could try only adding the aura around heads of larger snakes than us,
// but this way it helps with choke points too
function addAuraToOtherSnakeHeads() {
    for (snake of reqBody.snakes) {
        if (snake.id !== reqBody.you) {
            for (coord of getNeighborCoords(snake.coords[0])) {
                gridBlock(coord);
            }
        }
    }
}

function gridOpen(coord) {
    board.grid[coord[1]][coord[0]] == 0;
}

// puts a '1' at a coordinate on the grid
function gridBlock(coord) {
    board.grid[coord[1]][coord[0]] = 1;
}

function isGridOpen(coord) {
    return board.grid[coord[1]][coord[0]] == 0;
}
// TODO : if other snake head is a target, take the 1 off it on grid
// givena coord, returns array of neighbors that are
function getRandomFreeNeighbor(coord) {
    var neighbors = getNeighborCoords(coord);
    var result;
    if (neighbors.length == 0) {
        return -1; // no neighbors :(
    }

    for (coord of neighbors) {
        if (isGridOpen(coord)) {
            result = coord;
            break;
        }
    }
    return result;
    //var randomIndex = Math.random() * neighbors.length;
    //return neighbors[randomIndex];
}
// find a path from a to b
// handles the grid cloning and other things
// (which the docs for pathfinding algorithm state is necessary)
function pathFind(a, b) {
    var grid = clone2dArray(board.grid);

    // NOTE: the coords a and b are zeroed on the grid before the search, if either are 1
    // the search algorithm wont work
    grid[a[1]][a[0]] = 0;
    grid[b[1]][b[0]] = 0;

    var pfgrid = new PF.Grid(grid);
    var finder = new PF.AStarFinder();
    var path = finder.findPath(a[0], a[1], b[0], b[1], pfgrid);

    return path;
}
// for now Im just considering a path to food valid if theres a path to tail from it.
// being picky about what food we're eating..
function getPathsToFood(fromCoord, tail) {
    var foodPaths = [];

    for (food of reqBody.food) {
        // make sure theres a path to tail first
        var thisFoodPath = pathFind(fromCoord, food);
        //console.log('path from food to tail? ');
        if (hasPath(food, tail)) {
            foodPaths.push(thisFoodPath);
        }
    }
    return foodPaths;
}
// probly a faster way to do this using Array.splice..
function clone2dArray(grid) {
    var newgrid = [];

    for (var x = 0; x < grid.length; x++) {
        newgrid[x] = [];
        for (var y = 0; y < grid[x].length; y++) {
            newgrid[x][y] = grid[x][y];
        }
    }
    return newgrid;
}

function hasPath(fromCoord, toCoord) {
    var path = pathFind(fromCoord, toCoord);
    return path.length > 0;
}

// example of fromCoord/toCoord is array [19,19]
// so for this function, we are going to set the source & destination to 0 on the temp grid,
// otherwise there for sure wont be a path
function getShortestPathIndex(arrayOfPaths) {
    var shortestPath = 99999;
    var index = -1;
    var i = 0;
    for (path of arrayOfPaths) {

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
function directionBetweenCoords(coord1, coord2) {
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

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function findMySnake() {
    var mySnake;
    for (snake of reqBody.snakes) {
        if (snake.id == reqBody.you) {
            mySnake = snake;
        }
    }
    return mySnake;
}
module.exports = router;
