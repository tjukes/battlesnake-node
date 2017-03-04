module.exports = function chaseTail(board, snake, prevTail) {
<<<<<<< 7dea57b7aeeb506574c3b4079e1ad9fa7cb96302

    console.log('Chasing last tail: ' + prevTail + 'along path:');
=======
    console.log('Chasing last tail: ' + prevTail + ' along path: ');
>>>>>>> Finished debugging merge in from new-master
    var path = board.pathFind(snake.head, prevTail);
    console.log(path);
    var move = board.directionBetweenCoords(snake.head, path[1]);
    return move;
};
