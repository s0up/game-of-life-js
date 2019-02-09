/*
  Implement Conway's game of life with standard rules (B3/S23)
*/

class GameOfLife {
  constructor (x, y, initiallyRandom = true, tickInterval = 100) {
    this.grid = []

    for (let i = 0; i <= y; i++) {
      this.grid.push(Array(x).fill(0))
    }

    if (initiallyRandom) {
      this.eachCell((x, y) => {
        this.grid[y][x] = Math.round(Math.random())
      })
    }

    this.tickInterval = tickInterval
  }

  start () {
    const loop = async () => {
      this.tick()
      await this.sleep(this.tickInterval)
      loop()
    }

    loop()
  }

  tick () {
    // Implement cellular automata B3/S23.

    const proposedChanges = []

    this.eachCell((x, y, status) => {
      const livingNeighbors = this.countLivingNeighbors(x, y)

      if (status === 1 &&
          (livingNeighbors < 2 || livingNeighbors > 3)) {
        proposedChanges.push([x, y, 0])
      }

      if (status === 0 && livingNeighbors === 3) {
        proposedChanges.push([x, y, 1])
      }
    })

    proposedChanges.forEach(change => {
      this.grid[change[1]][change[0]] = change[2]
    })
  }

  countLivingNeighbors (x, y) {
    return [
      [x, y - 1], // N
      [x + 1, y - 1], // NE
      [x + 1, y], // E
      [x + 1, y + 1], // SE
      [x, y + 1], // S
      [x - 1, y + 1], // SW
      [x - 1, y], // W
      [x - 1, y - 1] // NW
    ].filter(xy => {
      return xy[0] >= 0 && xy[0] < this.grid[0].length &&
        xy[1] >= 0 && xy[1] < this.grid.length
    }).reduce((count, neighbor) => {
      return count + this.grid[neighbor[1]][neighbor[0]]
    }, 0)
  }

  eachCell (fn) {
    this.grid.forEach((y, yi) => {
      y.forEach((x, xi) => {
        fn(xi, yi, x)
      })
    })
  }

  sleep (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  getGridString () {
    let gridText = ''
    this.grid.forEach(y => {
      y.forEach(x => {
        gridText += `${x !== 0 ? '*' : ' '}`
      })

      gridText += '\n'
    })

    return gridText
  }

  getGridArray () {
    return this.grid
  }
}

module.exports = GameOfLife
