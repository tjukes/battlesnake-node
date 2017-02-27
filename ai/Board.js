/** Class represents the board */
class Board {
  /**
 * Create a board object.
 * The board will keep track of the request information
 * and keep the game states and other useful useful information
 * infered from the current state.
 * @param {<Object>} body - the body of the request
 *
 */
  constructor(body) {
    this.height = body.height;
    this.width = body.width;
  }
}

module.exports = Board
