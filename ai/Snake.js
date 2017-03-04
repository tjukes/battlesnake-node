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
            /*
                        // if we have food built up in our tail (weird rules!)
                        if ((tail[0] == pretail[0]) && (tail[1] == pretail[1])) {
                            pretail = me.coords[me.coords.length - 3];
                        }

                        var diff = [tail[0] - pretail[0], tail[1] - pretail[1]];

                        this.posttail = [tail[0] + diff[0],
                            tail[1] + diff[1]
                        ];*/
        }
        this.removeBelly();


    }

    removeBelly() {
        var preTail = this.coords[this.size - 2];
        if (this.size > 2) {

            //var i = this.size - 1;

            //do {
            //var bottomCoord = this.coords.pop();
            //} while (equal(bottomCoord, this.tail));
            if (this.tail == preTail) {
                this.coords.pop();
            }
        }
    }
};

function equal(coord1, coord2) {
    return ((coord1[0] == coord2[0]) && (coord1[1] == coord2[1]));
}
