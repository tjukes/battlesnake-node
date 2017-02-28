'use strict';

var express = require('express');
var router  = express.Router();
var PF = require('pathfinding');
var Board = require("../ai/Board.js");

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game

  // Response data
  var data = {
    color: "blue",
    name: "Ark-snake",
    head_url: "../spearhead.png", // optional, but encouraged!
    taunt: "eat all the things!!11~~", // optional, but encouraged!
  };

  return res.json(data);
});

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  // NOTE: Do something here to generate your move
  // LOGIC COMES HERE - ARKADIS VERSION


  try {
    var board = new Board(req.body); // information from request
    console.log('trying');
    console.log('making a move');
    console.log('food present at ' + board.food);
    console.log(board.grid);
  } catch(e) {
    console.log(e.message);
    
  }

  
  
  var data = {
    // move: chooseRandomMove(['up','down','left','right']),
    move: 'up', // options are up down left right
    taunt: "eat all the things!!11~~",
  };
  return res.json(data);
});

module.exports = router;

