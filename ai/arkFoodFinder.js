/*jslint node: true */
/*jshint esversion: 6 */
'use strict';

var PF = require('pathfinding');
//var Board = require('Board.js');

function foodFinderAI(board) {

    function findDirection(srcX, srcY, destX, destY) {
        // src, dest = { x: __, y: _____ }
        // error check

        if ((Math.abs(srcX - destX) + (Math.abs(srcY - destY)) !=1 )) {
            console.log('crappy input: src = ' + srcX + ', ' + srcY + ' dest = ' + destX+','+ destY);
            return;
        }
        var res = "";
        if (destX > srcX) { res = "right"; }
        if (destX < srcX) { res = "left"; }
        if (destY < srcY) { res = "up"; }
        if (destY > srcY) { res = "down"; }
        return res;
    }

    function findMySnake(board) {
    	// get full board, return array containing our snake coords
    	var ourSnake = [];
    	var i;

    	try {
    		while (board.snakes[i].id != board.you) {
	    		i++;
	    		if (i>10) {
	    			console.log('cant find our own snake?');
	    			throw ('cant find our snake!!');
	    		}
	    		return board.snakes[i].coords;
	    	}
    	} 
    	catch(e) { console.log ('snake finding function issue'); }
    }

    function findMyHead(board) {
    	var ourSnake = [];
    	var i=0;

    	try	{
    		while (board.snakes[i].id != board.you) {
	    		i++;
	    		if (i>10) {
	    			console.log('cant find our own snake?');
	    			throw ('cant find our snake!!');
	    		}
	    	}
	    	return board.snakes[i].coords[0];	
    	} catch(e) {
    		console.log ('find my head issue');
    		console.log (board);
    		console.log ('board snakes[0]= ', board.snakes[0].id);
    	}
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
    var theMove = findDirection(head[0], head[1], nextLocation[0], nextLocation[1]);

    console.log('my head is at ' + head[0] + ', ' + head[1] + '. heading to nearest food @ ');
    return {
    	confidence: 0.93,
    	move: theMove
  	};
    
}

module.exports = foodFinderAI;
