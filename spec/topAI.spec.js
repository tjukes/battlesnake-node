topAI = require('../ai/topAI.js');

describe("topAI", () => {
  var mockRequest;

  beforeEach(() => {
    mockRequest = {width: 10, height:10}
  })
  it("returns one of up, down, left, or right", () => {
    expect(topAI(mockRequest)).toMatch(/up|down|left|right/)
  })
})
