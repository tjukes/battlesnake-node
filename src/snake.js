function moveToFood(snakes, me, grid) {

    var pfgrid = new PF.Grid(grid);
    var finder = new PF.AStarFinder();
    var path = finder.findPath(1, 2, 4, 2, grid);
}

module.exports = moveToFood;
