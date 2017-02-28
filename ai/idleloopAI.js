'use strict';

var PF = require('pathfinding');
var grid = require('Board.js')

function idleLoopAI(board) {

	var finder = new PF.AStarFinder();
	var ourSnakeHead = {
		x: 0,
		y:0 
	};
	var closestFood = {
		x:0,
		y:0
	},



	var path = finder.findPath(ourSnakeHead.x, ourSnakeHead.y, closestFood.x, closestFood, grid);
	// return
	return {
		confidence: .93,
    	move: "up"
	}  
  }
}

module.exports = idleLoopAI 