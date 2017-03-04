'use strict';

var Board = require('../ai/Board.js');
var Snake = require('../ai/Snake.js');
var chaseTail = require('../ai/ChaseTail.js');

function findLastDifferentTail(reqBodyHistory) {
    var currentReqBody = reqBodyHistory[reqBodyHistory.length - 1];
    var currentSnake = new Snake(currentReqBody, currentReqBody.you);
    var lastTail = currentSnake.tail;

    for (var i = reqBodyHistory.length - 1; i > 0; i--) {
        var snake = new Snake(reqBodyHistory[i], reqBodyHistory[i].you);
        if (!equal(lastTail, snake.tail)) {
            break;
        }
    }
    return snake.tail;
}

function getPreviousTail(reqBodyHistory) {
    if (reqBodyHistory.length < 3) return false;
    var previousReqBody = reqBodyHistory[reqBodyHistory.length - 2];
    var previousSnake = new Snake(previousReqBody, previousReqBody.you);
    return previousSnake.tail;
}

// these will be moved to utils or deleted if already in there
function copyCoord(c) {
    return [c[0], c[1]];
}

function equal(coord1, coord2) {
    return ((coord1[0] == coord2[0]) && (coord1[1] == coord2[1]));
}
module.exports = function getMyMove(reqBody, reqBodyHistory) {

    var isFirstMove = reqBodyHistory.length == 1;

    var snake = new Snake(reqBody, reqBody.you);

    var previousTail = false;
    var lastDifferentTail = false;
    if (!isFirstMove) {
        var previousTail = getPreviousTail(reqBodyHistory);

        if (!equal(snake.tail, previousTail)) {
            lastDifferentTail = copyCoord(previousTail);
        }
    }

    var head = snake.head;
    var tail = snake.tail;

    // create a can't-go-there grid in board.grid
    var board = new Board(reqBody.height);

    console.log('My Head @ ' + head);
    console.log('My Tail @ ' + tail);
    console.log('My Last tail: ' + previousTail);
    console.log('My Last diff tail: ' + lastDifferentTail);

    console.log('My Length: ' + snake.coords.length);
    console.log('My health: ' + snake.health_points);
    console.log('Im storing food in my butt? ' + snake.isStoringFood);

    board.addSnakes(reqBody.snakes);

    // this doesnt do anything
    board.addFood(reqBody.food);
    if (!isFirstMove)
        console.log('Is lastTail open?' + board.isGridOpen(lastDifferentTail));

    var myPathsToFood = board.getPathsToFood(head, tail);

    if (myPathsToFood.length > 1) {
        // of course add the auras..
        board.addAuraToOtherSnakeHeads(reqBody.you);
    }

    board.print();

    var myMove = false;

    // the key to this working is the snake.health_points < 99
    // meaning we ate in the last turn
    // 8 might be able to be smaller
    // previous tail is where tail last was
    var weHaveAPathToTail = false;
    if (!isFirstMove)
        weHaveAPathToTail = board.hasPath(head, lastDifferentTail);
    var notHungry = snake.health_points > 65;
    var conditionsRightForTailChasing = !isFirstMove && weHaveAPathToTail && (snake.health_points < 99 && notHungry && snake.coords.length > 8);
    var wehaveAPathToFood = myPathsToFood.length > 0;

    /*************************        CONSOLE   ****************************************/

    console.log("Conditions Right For Tail Chasing: " + conditionsRightForTailChasing);
    console.log('Have A Path To Tail: ' + weHaveAPathToTail);
    console.log('Have A Path To Food: ' + wehaveAPathToFood);

    /******************************   /CONSOLE     ***************************/

    if (conditionsRightForTailChasing ||
        (!conditionsRightForTailChasing && !wehaveAPathToFood)) {
        console.log('I will chase my tail.');
        return chaseTail(board, snake, lastDifferentTail);
    }

    if (wehaveAPathToFood) {

        var myFoodTargetIndex = board.getShortestPathIndex(myPathsToFood);
        var myFoodPath = myPathsToFood[myFoodTargetIndex];

        if (myFoodPath) {
            // is there food?
            console.log('Heading to food @ ' + reqBody.food[myFoodTargetIndex]);

            myFoodPath.shift();
            var nextCoordToFood = myFoodPath.shift();
            myMove = board.directionBetweenCoords(head, nextCoordToFood);
        } else {
            console.log(myPathsToFood);
            throw new Error('SOME THING WRONG!');
        }
    }
    if (!myMove) {
        console.log('I HAVE NO PATH TO FOOD - I AM LOST');
        // just move randomly as long as the place I move to has path to tail.
        // otherwise who knows..

        var target = board.getRandomFreeNeighbor(head);

        console.log('MOVING RANDOMLY TO  ' + target);
        var myMove = board.directionBetweenCoords(head, target);
    }

    console.log('I think I will move ' + myMove);
    console.log('-------------------------------------------------');

    return myMove;



};
