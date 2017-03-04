'use strict'

var Board = require('../ai/Board.js');
var Snake = require('../ai/Snake.js');
var SanityCheck = require('../ai/sanityCheck.js');

module.exports = function getMyMove(reqBody) {

    try {

        var snake = new Snake(reqBody, reqBody.you);
        var head = snake.head;
        var tail = snake.tail;

        // create a can't-go-there grid in board.grid
        var board = new Board(reqBody);

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

        // Do a sanity check on the chosen move with no fancy grid stuff, to
        // (a) make sure we have a move
        // (b) make sure the move doesn't bump us into ourselves, another snake, or a wall
        myMove = SanityCheck(myMove, head, board.snakesOnlyGrid);

        return myMove;

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

}
