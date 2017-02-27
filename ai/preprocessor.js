var Board = require("./Board.js");

function preprocessor(reqBody) {
  var currentBoard = new Board(reqBody);

  //Returns data object.  Can add other attributes here besides board
  return {
    currentBoard: currentBoard
  }
}

module.exports = preprocessor;
