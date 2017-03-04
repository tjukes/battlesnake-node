/*jshint esversion: 6 */
/*jslint node: true */
'use strict';

module.exports = {
	findDirection: function(srcX, srcY, destX, destY) {
        // src, dest = { x: __, y: _____ }
        // error check

        if ((Math.abs(srcX - destX) + (Math.abs(srcY - destY)) !=1 )) {
            console.log('crappy input: src = ' + srcX + ', ' + srcY + ' dest = ' + destX+','+ destY);
            return;
        }
        var res = "";
        if (destX > srcX) { res = "right"; }
        if (destX < srcX) { res = "left"; }
        if (destY < srcY) { res = "up"; }
        if (destY > srcY) { res = "down"; }
        return res;
	}
};