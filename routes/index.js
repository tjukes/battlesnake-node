'use strict';

var express = require('express')
var router  = express.Router()
var PF = require('pathfinding')

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game

  // Response data
  var data = {
    color: "pink",
    name: "Arksnake",
    head_url: "../spearhead.png", // optional, but encouraged!
    taunt: "eat all the things!!11~~", // optional, but encouraged!
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  // NOTE: Do something here to generate your move
  //function chooseRandomMove(arr) {
    //return arr[Math.floor(Math.random() * arr.length)];

    // LOGIC COMES HERE - ARKADIS VERSION

  function food_on_board(board) {
  if (board.food.length >0) {
    return true;
  }
  else
    { return false;}
  }

  var board = req.body;

  console.log('making a move');
  console.log('food present at ' + board.food)

  // console.log('living snakes array' + req.body.snakes[0].taunt);

  var grid;
  var x = board.width;
  var y = board.height;
  for (i=0; i<x; i++) {
    for (j=0; j<y; j++) {
      grid[i][j]=0;
    }
  }

  console.log(grid);

  console.log('dimentions: ', x, ', ', y)

  if (food_on_board(board)) {
    console.log('food present, going for food');
  }

  var data = {
    // move: chooseRandomMove(['up','down','left','right']),
    move: 'up', // options are up down left right
    taunt: "eat all the things!!11~~",
  }
  return res.json(data);
})

module.exports = router;

