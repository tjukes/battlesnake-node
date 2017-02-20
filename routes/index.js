var express = require('express')
var router  = express.Router()

var PF = require('pathfinding');

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game

  // Response data
  var data = {
    color: "#DFFF00",
    name: "Trump Snake",
    head_url: "http://www.placecage.com/c/200/200", // optional, but encouraged!
    taunt: "Let's do thisss thang!", // optional, but encouraged!
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  // NOTE: Do something here to generate your move

  // BUILDING THE BOARD

  // Make a new *blank* board representation from the post request
  // NOTE the pathfinding functions change the grid they assess
  // so a new one is needed for every turn
  var board = new PF.Grid(req.body.width, req.body.height);

  // Take a snake's coords and make them non-walkable on the board
  function addSnakeToBoard(snake) {
    snake.coords.forEach(function(coord) {
      board.setWalkableAt(coord[0], coord[1], false);
    })
  }

  // Update board representation with all snake coords
  req.body.snakes.forEach(function(snake) {
    addSnakeToBoard(snake);
  })

  // Keep this here until move functionality improved
  function chooseRandomMove(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // FINDING SELF
  // Parameters: 'snakes' array & 'you' string from HTTP request body
  // Returns coordinates of own snake's head
  function findMyHead(snakes, myID) {
    return snakes.find(function(snake) {return snake.id == myID;}).coords[0];
  }
  // Store location of own head for use in rest of 'move' logic
  var myLocation = findMyHead(req.body.snakes, req.body.you);

  // Response data
  var data = {
    move: chooseRandomMove(['up','down','left','right']),
    taunt: 'Outta my way, snake!', // optional, but encouraged!
  }

  return res.json(data)
})

module.exports = router
