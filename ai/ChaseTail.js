module.exports = function chaseTail(board, snake, prevTail) {
    console.log('Chasing last tail: ' + prevTail);
    var path = board.pathFind(snake.head, prevTail);
    var move = board.directionBetweenCoords(snake.head, path[1]);
    return move;
};
