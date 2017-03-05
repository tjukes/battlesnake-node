'use strict';
var express = require('express');
var router = express.Router();
var getMyMove = require('../ai/topAI.js');
var numSnakes = 0;
var previousReqBody;
var previousPreviousReqBody;
// 2d array handling game history up till now
var reqBodyHistories = [];
var lastDiffTailByGame = [];
// Handle POST request to '/start'
router.post('/start', function(req, res) {

    numSnakes++;
    // Response data
    var returnData = {
        color: "#DFFF00",
        name: "SnakeSpeare",
        //head_url: "../spearhead.png", // optional, but encouraged!
        taunt: "Come, come, you froward and unable worms!", // optional, but encouraged!
    };
    return res.json(returnData);
});

// Handle POST request to '/move'
router.post('/move', function(req, res) {
    try {
        //console.log(req.body);
        var reqBodyHistory = updateAndGetHistory(req.body);
        console.log('Found game history with :' + reqBodyHistory.length + ' moves.');
        console.log(req.body.turn);
        var responseData = {
            move: getMyMove(req.body, reqBodyHistory), // one of: ['up','down','left','right']
            taunt: shakespearianTaunt(), // optional, but encouraged!
        };
        return res.json(responseData);

    } catch (err) {
        if (err.message) {
            console.log('\nMessage: ' + err.message);
        }
        if (err.stack) {
            console.log('\nStacktrace:');
            console.log('====================');
            console.log(err.stack);
        }
    }
});

// adds the current req.body to the appropriate game history
// returns the entire history for this game, with history[0] being
// the first req.body
function updateAndGetHistory(reqBody) {
    // game id doesnt change when you press 'q' to reset game. so if turn is 0, reset this game
    var turn = reqBody.turn;
    var gameID = reqBody.game_id;

    var i = 0;
    for (var reqBodyHistory of reqBodyHistories) {
        if (reqBodyHistory[0].game_id == gameID) {

            break;
        }
        i++;
    }
    if (i == reqBodyHistories.length) {
        // if this game not yet in histories - add it
        // begin a new game history
        lastDiffTailByGame.push([]);
        // set game history index to newest addition
        i = reqBodyHistories.length - 1;
    }
    // if turn is 0, reset this game.
    if (turn == 0) {
        reqBodyHistories[i] = [];
    }
    reqBodyHistories[i].push(reqBody);
    return reqBodyHistories[i];
}

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
