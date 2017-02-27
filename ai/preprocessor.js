var Board = require("./Board.js");

function preprocessor(req) {
  board = new Board(req);

  return {
    board: board
  }
}

module.exports = preprocessor;
