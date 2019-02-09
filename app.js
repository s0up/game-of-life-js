const GOL = require('./GameOfLife')
const vorpal = require('vorpal')()

const gol = new GOL(30, 30, true, 100)

gol.start()

setInterval(function () {
  vorpal.ui.redraw(gol.getGridString())
}, 100)
