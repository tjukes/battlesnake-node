function Board(size) {
    this.grid = [];
    this.size = size;
    for (var x = 0; x < size; x++) {
        this.grid[x] = [];
        for (var y = 0; y < size; y++) {
            this.grid[x][y] = 0;
        }
    }
}

Board.prototype.addSnakes = function(snakes) {
    snakes.forEach(function(snake) {
        snake.coords.forEach(function(snakeCoords, i) {
            var x, y;
            x = snakeCoords[0];
            y = snakeCoords[1];
            this.grid[y][x] = 1;
        }.bind(this));
    }.bind(this));
};

Board.prototype.addFood = function(foods) {
    foods.forEach(function(food) {
        var x, y;
        x = food[0];
        y = food[1];
        this.grid[y][x] = 0;
    }.bind(this));
};


module.exports = Board;
