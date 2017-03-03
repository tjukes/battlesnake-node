topAI = require('../ai/topAI.js');

describe("topAI", () => {
  var mockRequest;

  beforeEach(() => {
    mockRequest = {
      "you": "25229082-f0d7-4315-8c52-6b0ff23fb1fb",
      "width": 2,
      "turn": 0,
      "snakes": [
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
              0
            ],
            [
              0,
              0
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
              1,
              0
            ],
            [
              1,
              0
            ],
            [
              1,
              0
            ]
          ]
        }
      ],
      "height": 2,
      "game_id": "870d6d79-93bf-4941-8d9e-944bee131167",
      "food": [
        [
          1,
          1
        ]
      ],
      "dead_snakes": [
        {
          "taunt": "gotta go fast",
          "name": "other-snake",
          "id": "c4e48602-197e-40b2-80af-8f89ba005ee9",
          "health_points": 50,
          "coords": [
            [
              5,
              0
            ],
            [
              5,
              0
            ],
            [
              5,
              0
            ]
          ]
        }
      ]
    }
  })
  it("returns one of up, down, left, or right", () => {
    expect(topAI(mockRequest)).toMatch(/up|down|left|right/)
  })
})
