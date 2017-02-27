exampleAI = require("./exampleAI.js");
preprocessor = require("./preprocessor.js");

function topAI(req) {
  preprocessor = preprocessor(req)
  board = preprocessor.board;

  // Run each AI
  AIs = [exampleAI];
  votes = AIs.map((fn) => fn(board));

  // Change how to decide between AIs later
  move = votes[0].move;

  return move
}


module.exports = topAI
