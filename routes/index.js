var express = require('express');
var router = express.Router();
var grid = [];
var Board = require('../src/gridBuilder.js');
var PF = require('pathfinding');
var board;
var data;

/*
TODO Next:
- avoid head on collissions with larger snakes
- when there's no path to food, it has no idea where to go
    - maybe outline a path around the open space the snake is currently in
*/

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

    data = req.body;
    try {
        var me = findMySnake(data);

        var headX = me.coords[0][0];
        var headY = me.coords[0][1];

        var tailX = me.coords[me.coords.length - 1][0];
        var tailY = me.coords[me.coords.length - 1][1];

        board = new Board(data.height);
        board.addSnakes(data.snakes);

        // there might not be food sometime..
        board.addFood(data.food);
        var myPathsToFood = getPathsToFood(headX, headY, data, tailX, tailY);

        console.log(board.grid);
        console.log('My Head @ ' + headX + ', ' + headY);
        console.log(myPathsToFood);
        if (myPathsToFood.length > 0) {
            // if it can't find paths to food, maybe it will go to arkadi's algortim
            ///filterOutPathsWithoutEscapeRoutes(myPathsToFood);
            var myFoodTargetIndex = getShortestPathIndex(myPathsToFood);
            var myFoodPath = myPathsToFood[myFoodTargetIndex];

            // is there food?
            console.log('Heading to food @ ' + data.food[myFoodTargetIndex][0] + ', ' + data.food[myFoodTargetIndex][1]);

            myFoodPath.shift();
            var nextCoordToFood = myFoodPath.shift();
            var theMove = directionBetweenCoords(headX, headY, nextCoordToFood[0], nextCoordToFood[1]);
        } else {
            console.log('I HAVE NO PATH TO FOOD - I AM LOST');
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

    var data = {

        move: theMove, // one of: ['up','down','left','right']
        taunt: 'Outta my way, snake!', // optional, but encouraged!
    };

    return res.json(data);
});


function getPathsToFood(fromX, fromY, data, tailX, tailY) {
    var foodPaths = [];

    for (food of data.food) {
        var x = food[0];
        var y = food[1];
        var pfgrid = new PF.Grid(board.grid);
        var finder = new PF.AStarFinder();
        var thisFoodPath = finder.findPath(fromX, fromY, x, y, pfgrid);

        // make sure theres a path to tail first
        if (hasPath([x, y], [tailX, tailY]))
            foodPaths.push(thisFoodPath);
    }
    return foodPaths;
}

function hasPath(fromCoord, toCoord) {
    var pfgrid = new PF.Grid(board.grid);
    var finder = new PF.AStarFinder();
    var thisFoodPath = finder.findPath(fromCoord[0], fromCoord[1], toCoord[0], toCoord[1], pfgrid);
}

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
function directionBetweenCoords(x1, y1, x2, y2) {
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

function findMySnake(data) {
    var mySnake;
    for (snake of data.snakes) {
        if (snake.id == data.you) {
            mySnake = snake;
        }
    }
    return mySnake;
}
module.exports = router;
