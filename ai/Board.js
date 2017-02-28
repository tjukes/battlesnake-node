/** Class represents the board */
class Board {
  /**
 * Create a board object.
 * The board will keep track of the request information
 * and keep the game states and other useful useful information
 * infered from the current state.
 * @param {<Object>} body - the body of the request
 *
 */
  	constructor(body) {
    	this.height = body.height;
    	this.width = body.width;
    	this.food = body.food;
    	this.game_id = body.game_id;
    	this.turn = body.turn;
    	this.you = body.you; // our snake id
    	this.snakes = body.snakes;

    	this.grid = [];
    	//zero fill
    	for (var x = 0; x < this.width; x++) {
        	this.grid[x] = [];
        	for (var y = 0; y < this.height; y++) {
            	this.grid[x][y] = 0;
        	}
    	}

    	addSnakes(this.snakes);
    	// addFood(this.food); // can be added later - 
    	// just need snakes to build walkability grid for pathfinder
  	}

  	addSnakes(snakes) {

	    snakes.forEach(function(snake) {
	        snake.coords.forEach(function(snakeCoords, i) {
	            var x, y;
	            x = snakeCoords[0];
	            y = snakeCoords[1];
	            this.grid[y][x] = 1;
	        }.bind(this));
	    }.bind(this));
	};

	// addFood(foods) {
	// 	// todo, sub for instead of foreach later
	//     foods.forEach(function(food) {
	//         var x, y;
	//         x = food[0];
	//         y = food[1];
	//         this.grid[y][x] = 2;
	//     }.bind(this));
	// };


}

module.exports = Board;
