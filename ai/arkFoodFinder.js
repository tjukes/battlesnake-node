'use strict';

var PF = require('pathfinding');
var board = require('Board.js')

function foodFinderAI(board) {

	function findDirection(src,dest) {
		// src, dest = { x: __, y: _____ }
		// error check
		if ((Math.abs(src.x - dest.x) !=1) || (Math.abs(src.y - dest.y) !=1)) {
			console.log('crappy input: src = ', src, ' dest = ', dest);
			return;
		}
		var res = "";
		if (dest.x > src.x) { res = "right" }
		if (dest.x < src.x) { res = "left" }
		if (dest.y < src.y) { res = "up" }
		if (dest.y > src.y) { res = "down" }
		return res;
 	}

	function findFoodPaths(src,data) {
		var foodPaths = [];
    	data.food.forEach(function(food) {
        	var x = food[0];
        	var y = food[1];
        	var pfgrid = new PF.Grid(board.grid);
        	var finder = new PF.AStarFinder();
        	var thisFoodPath = finder.findPath(src.x, src.y, x, y, pfgrid);
        	foodPaths.push(thisFoodPath);
  		});
    	return foodPaths;
	}
	
	
	var finder = new PF.AStarFinder();
	


	var closestFoodPath = findClosestFood(board);

	var dest = finddest(board);

	var move = findMove(board);

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