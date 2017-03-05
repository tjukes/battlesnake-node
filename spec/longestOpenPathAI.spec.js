var getLongest = require('../ai/longestOpenPathAI.js');

var grid = [
  [0,0,0,0,0,0],
  [0,1,1,1,1,1]
];

describe("lop", () => {
  it("print", () => {
    console.log(getLongest([0,0], grid));
  });
});
