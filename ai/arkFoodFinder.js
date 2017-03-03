/*jslint node: true */
/*jshint esversion: 6 */
'use strict';

var PF = require('pathfinding');
var board = require('Board.js');

function foodFinderAI(board) {

    function findDirection(src, dest) {
        // src, dest = { x: __, y: _____ }
        // error check
        if ((Math.abs(src.x - dest.x) != 1) || (Math.abs(src.y - dest.y) != 1)) {
            console.log('crappy input: src = ', src, ' dest = ', dest);
            return;
        }
        var res = "";
        if (dest.x > src.x) { res = "right"; }
        if (dest.x < src.x) { res = "left"; }
        if (dest.y < src.y) { res = "up"; }
        if (dest.y > src.y) { res = "down"; }
        return res;
    }

    function findMySnake(board) {
    	// get full board, return array containing our snake coords
    	var ourSnake = [];
    	var i;

    	while (board.snakes[i].id != board.you) {
    		i++;
    		if (i>10) {
    			console.log('cant find our own snake?');
    			throw ('cant find our snake!!');
    		}
    	}
    	return board.snakes[i].coords;
    }

    function findMyHead(board) {
    	var ourSnake = [];
    	var i;

    	while (board.snakes[i].id != board.you) {
    		i++;
    		if (i>10) {
    			console.log('cant find our own snake?');
    			throw ('cant find our snake!!');
    		}
    	}
    	return board.snakes[i].coords[0];	
    }	



    function findFoodPaths(board) {
        var foodPaths = [];
        board.food.forEach(function(food) {
            var x = food[0];
            var y = food[1];
            var pfgrid = new PF.Grid(board.grid);
            var finder = new PF.AStarFinder();

            var myHead = {
            	x : findMyHead(board)[0],
            	y : findMyHead(board)[1],
            };

            console.log ('found my snake head at ' + myHead.x + ', ' + myHead.y);


            var thisFoodPath = finder.findPath(myHead.x, myHead.y, x, y, pfgrid);
            foodPaths.push(thisFoodPath);
        });
        return foodPaths;
    }

    function shortestFoodPath(paths) {
    	/** gets paths, calculates lengths and finds the shortest path
    	*/
    	var index = 0;
    	var shortest = paths[0].length;
    	for (var i = 0; i < paths.length; i++) {
    		if (paths[i].lengths < shortest) {
    			shortest = paths[i].length;
    			index = i;
    		}
    	}
    	console.log('shortest food path is: ' + paths[index]);
    	return paths[index];

    }

    // body
    // find shortest path to food, and go for it
    var foodPathsArray = findFoodPaths(board);
    var bestPath = shortestFoodPath(foodPathsArray);
    var nextLocation = bestPath[1];

    var head = findMyHead(board);
    var move = findDirection(head, nextLocation);

    console.log('my head is at ' + head[0] + ', ' + head[1] + '. heading to nearest food @ ');
    return move;

    
}

module.exports = foodFinderAI;
