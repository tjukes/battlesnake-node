var utils = require('../ai/utils.js');

var mockGrid = []
var mockBoard;

describe("_equiDistant", () => {
  it("Should have 4*distance number of items", () => {
    var head = [5,5]
    expect(utils._equiDistant(head, 3, 20, 20).length).toBe(12)
  })
  it('Should include this element in this case', () => {
    var head =[13,19]
    var check = [13,13]
    expect(_.findIndex(
          utils._equiDistant(head, 6, 20,20),
          (val) => val[0] ==check[0] && val[1] == check[1])
        ).toBeGreaterThan(-1)
  })
})

describe("equiDistantFromHead", () => {
  it("all indices should be positive", () => {
    var head = [3,3]
    var cells = utils.equiDistantFromHead(head, 5, 20, 20);
    expect(cells.filter((cell) => cell[0] < 0 || cell[1] < 0).length).toBe(0)
  })

  it("all indicies should not exceed the size of the board", () => {
    const width = 20;
    const height = 25;
    const head = [5,19]
    var cells = utils.equiDistantFromHead(head, 8, height, width);
    expect(cells.filter((cell) => cell[0] > height - 1 || cell[1] > width - 1 ).length).toBe(0)
  })
})

describe("closestSnakes", () => {
  beforeEach(mockDataClosestSnake)
  it("Should find that I am close to the right number of other snakes", () => {
    expect(utils.closestSnakes(mockBoard, 3).length).toBe(2);
    expect(utils.closestSnakes(mockBoard, 1).length).toBe(1);
    expect(utils.closestSnakes(mockBoard, 0).length).toBe(0);
  })
  it("List should be sorted, starting with smallest path", () => {
      list = utils.closestSnakes(mockBoard, 3)
      expect(list[1].path.length - list[0].path.length).toBeGreaterThan(-1)
  })
})

function mockDataClosestSnake() {
  var myUuid = "25229082-f0d7-4315-8c52-6b0ff23fb1fb";
  mockBoard =  {
    you: myUuid,
    grid: [
      [1,0,1,0,1,1,1],
      [1,0,0,0,0,0,0],
      [1,0,0,0,0,0,0],
      [0,0,0,0,0,0,0]
    ],
    "snakes": [
      {
        "taunt": "git bad",
        "name": "some-snake",
        "id": "25229082-f0d7-4315-8c52-6b0ff23fb1fc",
        "health_points": 93,
        "coords": [
          [
            2,
            0
          ]
        ]
      },
      {
        "taunt": "git gud",
        "name": "my-snake",
        "id": "25229082-f0d7-4315-8c52-6b0ff23fb1fb",
        "health_points": 93,
        "coords": [
          [
            0,
            0
          ],
          [
            0,
            1
          ],
          [
            0,
            2
          ]
        ]
      },
      {
        "taunt": "gotta go fast",
        "name": "other-snake",
        "id": "0fd33b05-37dd-419e-b44f-af9936a0a00c",
        "health_points": 50,
        "coords": [
          [
            4,
            0
          ],
          [
            5,
            0
          ],
          [
            6,
            0
          ]
        ]
      }
    ],
  }
}
