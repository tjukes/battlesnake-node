exampleAI = require("./exampleAI.js");
preprocessor = require("./preprocessor.js");

function topAI(req) {
  var data = preprocessor(req)
  var board = data.currentBoard;

  // Run each AI
  var AIs = [exampleAI];
  var votes = AIs.map((fn) => fn(board));

  // Change how to decide between AIs later
  var move = votes[0].move;

  return move
}


module.exports = topAI
