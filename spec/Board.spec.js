Board = require("../ai/Board.js");
_ = require('underscore');

describe("Board", () => {
  var testBoard;
  var testBody = {width: 5, height: 5, snakes: []};
  beforeEach(() => {
    testBoard = new Board(testBody);
  })

  it("creates a graph", () => {
    var graph = testBoard.createGraph([[0,1],[0,0]])
    var graphArray = [
      ["0,0", 0],["0,1", 1], ["1,0", 0], ["1,1", 0],
      [["0,0", "0,1"], 0], [["0,1", "0,0"], 1], [["0,0", "1,0"], 1], [["1,0", "0,0"], 1],
      [["1,1", "1,0"], 1], [["1,0", "1,1"], 1], [["1,1", "0,1"], 0], [["0,1", "1,1"], 1]
    ]
    expect(JSON.parse(graph.toJSON()).sort()).toEqual(graphArray.sort())
  })
})
