module.exports = function chaseTail(board, snake, prevTail) {

    console.log('Chasing last tail: ' + prevTail + 'along path:');
    var path = board.pathFind(snake.head, prevTail);
    console.log(path);
    var move = board.directionBetweenCoords(snake.head, path[1]);
    return move;
};
