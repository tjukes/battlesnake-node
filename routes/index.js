var express = require('express')
var router  = express.Router()

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game

  // Response data
  var data = {
    color: "#DFFF00",
    name: "SnakeSpeare",
    head_url: "../spearhead.png", // optional, but encouraged!
    taunt: "Come, come, you froward and unable worms!", // optional, but encouraged!
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  // NOTE: Do something here to generate your move

  // Response data
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

  var data = {
    move: 'up', // one of: ['up','down','left','right']
    taunt: shakespearianTaunt()
  }

  return res.json(data)
})

module.exports = router
