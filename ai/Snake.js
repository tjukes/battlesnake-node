'use strict';

const _ = require("underscore");

/**
 * @class Snake
 * Has all information about a snake (except name and taunts) given
 * by the request.  More importantly, it has some handy methods for
 * to explore its own possible future moves.
 * @param {Object} reqBody - might replace this with board
 * @param {string} uuid - snake's unique identifier
 */
module.exports = class Snake {

    constructor(reqBody, uuid, snake = null) {
        var me;

        //optionally can construct a clone from another snake
        if(snake !== null) {
          me = snake
        } else {
          for (var snake of reqBody.snakes) {
              if (snake.id == uuid) {
                  me = snake;
                  break;
              }
          }
        }

        this.size = this.coords.length;
        this.isStoringFood = false;

        // gets the coordinate of the spot 'after' the tail (cell that the tail points to)
        // if you just ate then the tail is the same coordinate as postail. in this case,
        // move posttail down one more
     
        if (this.size > 2) {
            var tail = this.tail();
            var pretail = me.coords[me.coords.length - 2];
            this.isStoringFood = equal(tail, pretail);

        }

        // this may not be necessarry anymore, will remove
       // this.removeBelly();

        // Want to clone everything so they can be modified
        // to explore future moves w/out overwriting
        // board/previous snakes's values

        this.uuid = me.uuid || me.id;
        this.id = me.uuid || me.id;
        this.health_points = me.health_points;
        this.coords = me.coords.map(_.clone);
        this.taunt = me.taunt;
        this.name = me.name;

    }

    get head() {
        return this.coords[0];
    }

    get tail() {
        return this.coords[this.coords.length - 1];
    }


    /**
     * Will return a copy of the snake who has moved in the direction
     * specified.  The direction will be taken whether or not its walkable,
     * it is the responsibility of the board keep track of snake, and tell
     * it on next turn whether or not it has died.
     * @param {string} direction - either of "up, "down", "left", "right"
     * @returns {Snake} a clone having taken the move.
     */
    move(direction) {
      var ghostSnake = this.clone()
      ghostSnake.health_points--;
      var nextCoord = []
      if(direction === 'left') {
        nextCoord[0] = ghostSnake.head[0] - 1;
        nextCoord[1] = ghostSnake.head[1];
        ghostSnake.coords.splice(0,0,nextCoord);
        ghostSnake.coords.pop()
      } else if(direction === 'right') {
        nextCoord[0] = ghostSnake.head[0] + 1;
        nextCoord[1] = ghostSnake.head[1];
        ghostSnake.coords.splice(0,0,nextCoord);
        ghostSnake.coords.pop()
      } else if(direction === 'up') {
        nextCoord[0] = ghostSnake.head[0];
        nextCoord[1] = ghostSnake.head[1] - 1;
        ghostSnake.coords.splice(0,0,nextCoord);
        ghostSnake.coords.pop()
      } else if(direction === 'down') {
        nextCoord[0] = ghostSnake.head[0];
        nextCoord[1] = ghostSnake.head[1] + 1;
        ghostSnake.coords.splice(0,0,nextCoord);
        ghostSnake.coords.pop()
      } else {
        throws("This is not a valid move", direction);
      }
      return ghostSnake;
    }

    clone() {
      return new Snake(null, null, this)
    }

    removeBelly() {
        var preTail = this.coords[this.size - 2];
        if (this.size > 2) {
            if (this.tail == preTail) {
                this.coords.pop();
            }
        }
    }
};

function equal(coord1, coord2) {
    return ((coord1[0] == coord2[0]) && (coord1[1] == coord2[1]));
}
