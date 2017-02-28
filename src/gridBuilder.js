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
    for (snake of snakes) {
        for (snakeCoords of snake.coords) {
            var x, y;
            x = snakeCoords[0];
            y = snakeCoords[1];
            this.grid[y][x] = 1;
        }
    }
};

Board.prototype.print = function() {
    console.log(this.grid);
    /*
    for (var y = 0; y < this.size; y++) {
        var row = [];
        for (var x = 0; x < this.size; x++) {
            row.push(this.grid[x][y]);
        }
        console.log(row);
    }*/
};

Board.prototype.addFood = function(foods) {
    for (food of foods) {
        var x, y;
        x = food[0];
        y = food[1];
        this.grid[y][x] = 0;
    }
};

module.exports = Board;
