'use strict';
var express = require('express');
var router = express.Router();
var getMyMove = require('../ai/topAI.js');
var numSnakes = 0;

// Handle POST request to '/start'
router.post('/start', function(req, res) {

    numSnakes++;
    // Response data
    var returnData = {
        color: "#DFFF00",
        name: "SnakeSpeare",
        head_url: "../spearhead.png", // optional, but encouraged!
        taunt: "Come, come, you froward and unable worms!", // optional, but encouraged!
    };
    return res.json(returnData);
});

// Handle POST request to '/move'
router.post('/move', function(req, res) {

    var responseData = {
        move: getMyMove(req.body), // one of: ['up','down','left','right']
        taunt: shakespearianTaunt(), // optional, but encouraged!
    };

    return res.json(responseData);
});

function shakespearianTaunt() {
    var taunts = [
        "Away, you starvelling, you elf-skin, you dried neat’s-tongue, bull’s-pizzle, you stock-fish!",
        "Away, you three-inch fool!",
        "The rankest compound of villainous smell that ever offended nostril",
        "Thou cream faced loon",
        "Thou leathern-jerkin, crystal-button, knot-pated, agatering, puke-stocking, caddis-garter, fork-tongue pouch!",
        "Your brain is as dry as the remainder biscuit after voyage.",
        "Would thou wert clean enough to spit upon"
    ];
    return taunts[Math.floor(Math.random() * taunts.length)];
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

module.exports = router;
