// able to construct map of probls. to see where each snake could end up in 1,2,3,4 maybe moves.

// per snake, we have: move 1 -> snake in place 1, 30%
// 								snake in place 2, 20%
// 									etc
// returns: 20x20 grids (board dimentions) of heat signatures
// eg [
// 	[	
// 	[1,0.6,0.3
// ]

// utilization: we want to modify A* to weigh the paths, and assign "length" based on the chance there might be obsturctions along that path (obstructions could be walls, future us, or other future ghost snakes) 

// my goal. read up on A* - see if we can modify it to accept 
// probabilities rather than 0/1 values in its graphs.