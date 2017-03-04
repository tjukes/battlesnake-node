module.exports = function chaseTail(board, snake, prevTail) {
<<<<<<< 5aae743a65fc8dc7b9db7312191e55228069aa44

    console.log('Chasing last tail: ' + prevTail + ' along path: ');
=======
    console.log('Chasing last tail: ' + prevTail + 'along path:');
>>>>>>> removed some commented out code, duplicate functions
    var path = board.pathFind(snake.head, prevTail);
    console.log(path);
    var move = board.directionBetweenCoords(snake.head, path[1]);
    return move;
};
