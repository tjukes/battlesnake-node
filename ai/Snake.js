'use strict';
module.exports = class Snake {

    constructor(reqBody, uuid) {
        var me;

        for (var snake of reqBody.snakes) {
            if (snake.id == uuid) {
                me = snake;
                break;
            }
        }

        this.tail = me.coords[me.coords.length - 1];
        this.head = me.coords[0];
        this.health_points = me.health_points;
        this.coords = me.coords;
        this.size = this.coords.length;
        this.isStoringFood = false;

        // gets the coordinate of the spot 'after' the tail (cell that the tail points to)
        // if you just ate then the tail is the same coordinate as postail. in this case,
        // move posttail down one more
        if (this.size > 2) {
            var tail = this.tail;
            var pretail = me.coords[me.coords.length - 2];
            this.isStoringFood = equal(tail, pretail);

        }

        // this may not be necessarry anymore, will remove
        this.removeBelly();
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
