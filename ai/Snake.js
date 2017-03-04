/*jshint esversion: 6 */
/*jslint node: true */

module.exports = function(body, snakeID) {
	/**  our snake, and some useful functions to get from it.
	* @param {} body = request body (or board)
	* @param snakeID, the id of the snake for which we want to build the object
	*/
	this.id = snakeID;
	this.head = 'foo';
	this.body = 'foo';
	this.tail = get tail();
}



function 