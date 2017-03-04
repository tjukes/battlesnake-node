var utils = require('../ai/utils.js')

var mockGrid = []

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
  beforeEach(() => {
  })

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
