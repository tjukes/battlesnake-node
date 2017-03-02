'use strict';
var express = require('express');
var router = express.Router();
var Board = require('../ai/Board.js');
var Snake = require('../ai/Snake.js');

var numSnakes = 0;

// Handle POST request to '/start'
router.post('/start', function(req, res) {

    numSnakes++;
    // Response data
    var returnData = {
        color: getRandomColor(),
        name: "Trump Snake #" + numSnakes,
        head_url: "http://www.placecage.com/c/200/200",
        taunt: 'ddfdfd',
    };
    return res.json(returnData);
});

/*
NOTE: grid[y][x] not [x][y]

*/

// Handle POST request to '/move'
router.post('/move', function(req, res) {

    var reqBody = req.body;
    try {

        var snake = new Snake(reqBody, reqBody.you);

        var head = snake.head;
        var tail = snake.tail;

        // create a can't-go-there grid in board.grid
        var board = new Board(reqBody.height);

        board.addSnakes(reqBody.snakes);

        // this doesnt do anything
        board.addFood(reqBody.food);

        // of course add the auras..
        board.addAuraToOtherSnakeHeads(reqBody.you);

        var myPathsToFood = board.getPathsToFood(head, tail);

        board.print();

        console.log('My Head @ ' + head);
        console.log('My Tail @ ' + tail);

        var myMove = false;

        if (myPathsToFood.length > 0) {

            var myFoodTargetIndex = board.getShortestPathIndex(myPathsToFood);
            var myFoodPath = myPathsToFood[myFoodTargetIndex];

            if (myFoodPath) {

                // is there food?
                console.log('Heading to food @ ' + reqBody.food[myFoodTargetIndex]);

                myFoodPath.shift();
                var nextCoordToFood = myFoodPath.shift();
                myMove = board.directionBetweenCoords(head, nextCoordToFood);
            }
        }
        if (!myMove) {
            console.log('I HAVE NO PATH TO FOOD - I AM LOST');
            // just move randomly as long as the place I move to has path to tail.
            // otherwise who knows..

            var target = board.getRandomFreeNeighbor(head);

            console.log('HEADED TO TARGET ' + target);
            var myMove = board.directionBetweenCoords(head, target);
        }

        console.log('I think I will move ' + myMove);
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

        move: myMove, // one of: ['up','down','left','right']
        taunt: snake.getRandomTaunt(), // optional, but encouraged!
    };

    return res.json(responseData);
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

module.exports = router;
