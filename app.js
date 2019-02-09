const GOL = require('./GOL')
const vorpal = require('vorpal')()

const gol = new GOL(30, 30)

gol.start()

setInterval(function () {
  vorpal.ui.redraw(gol.getGrid())
}, 100)
