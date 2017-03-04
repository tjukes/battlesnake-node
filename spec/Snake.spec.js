const Snake = require("../ai/Snake.js")
var snake = {}
var myUuid = "";
var mockBoard = {};

describe("Snakes", () => {
  beforeEach(mockDataSnake)
  it("coordinates are deeply cloned from board.snakes.coords", () => {
    expect(snake.coords).not.toBe(mockBoard.snakes[1].coords);
    expect(snake.coords[0]).not.toBe(mockBoard.snakes[1].coords[0]);
  });

  it("has a head that keeps updated to changes in coordinates", () => {
    originalHead = snake.head;
    snake.coords.splice(0,0,[1,0]);
    expect(snake.head).not.toBe(originalHead);
  });

  it("has a tail that keeps updated to changes in coordinates", () => {
    originalTail = snake.tail;
    snake.coords.splice(0,0,[1,0]);
    snake.coords.pop();
    expect(snake.tail).not.toBe(originalTail);
  });

  it("move returns clone", () => {
    nextSnake = snake.move("right");
    expect(nextSnake.uuid).toBe(nextSnake.uuid);
    expect(nextSnake.head).toEqual([1,0]);
    expect(nextSnake.tail).toEqual([0,1]);
  });
});

function mockDataSnake() {
  myUuid = "25229082-f0d7-4315-8c52-6b0ff23fb1fb";
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
  snake = new Snake(mockBoard, myUuid)
}
