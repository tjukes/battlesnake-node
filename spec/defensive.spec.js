const defensive = require('../ai/defensive.js');

describe("safeSpace", () => {
  var board = {};

  beforeEach(() => {
    var snakes = [
     {
       "taunt": "git bad",
       "name": "some-snake",
       "id": "25229082-f0d7-4315-8c52-6b0ff23fb1fc",
       "health_points": 93,
       "coords": [ [ 2, 0 ] ]
     },
     {
       "taunt": "git gud",
       "name": "my-snake",
       "id": "25229082-f0d7-4315-8c52-6b0ff23fb1fb",
       "health_points": 93,
       "coords": [ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ]
     },
     {
       "taunt": "gotta go fast",
       "name": "other-snake",
       "id": "0fd33b05-37dd-419e-b44f-af9936a0a00c",
       "health_points": 50,
       "coords": [ [ 4, 0 ], [ 5, 0 ], [ 6, 0 ] ]
     }
   ];
    var snakeObjs = snakes.map((snakeData) => new Snake({snakes: snakes}, snakeData.id))
    console.log(snakeObjs)
    board = {
      snakes : snakeObjs,
      width: 20,
      height: 20
    }
  });

  it("returns the right grid", () => {
    grid = defensive.safeSpace(board, 3);
    // console.log(grid, "safeSpaces grid");
    expect(grid).toEqual([
      [ 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    ])
  });

  it("more turns mean less available space", () => {
    var grid3Turns = defensive.safeSpace(board, 3);
    var grid4Turns = defensive.safeSpace(board, 4);
    var numOccupied3 = count(grid3Turns);
    var numOccupied4 = count(grid4Turns)
    expect(numOccupied3).toBe(24);
    expect(numOccupied3).toBeLessThan(numOccupied4);

  });
})

function count(grid) {
  return grid.reduce((rowCount, row) => {
      return rowCount + row.reduce((count, cell) => {
        return count+cell;
      },0);
    },0);
}
