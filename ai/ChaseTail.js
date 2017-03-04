module.exports = function chaseTail(board, snake, prevTail) {
    // check if path exists to tail
    // try just aiming for free neighbors of tail?
    /*
        var openNeighborsOfTail = board.getNeighborCoords(snake.tail);
        for (coord of openNeighborsOfTail) {
            console.log('head: ' + snake.head + ' coord ' + coord);
            console.log(path);
            if (path) {
                var firstStep = path[1];
                break;
            }
        }*/
    console.log('Chasing tail: ' + prevTail);
    console.log('From head: ' + snake.head);
    var path = board.pathFind(snake.head, prevTail);
    console.log(path);
    console.log('First step:' + path[1]);
    console.log('Moving ' + move);
    var move = board.directionBetweenCoords(snake.head, path[1]);
    return move;
};

/// get the space that the tail is pointing to if it's free.
