class GameOfLife {
  constructor (x, y, tickInterval = 100) {
    this.grid = []

    for (let i = 0; i <= y; i++) {
      this.grid.push(Array(x).fill(0))
    }

    this.eachCell((x, y) => {
      this.grid[y][x] = Math.round(Math.random())
    })

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
    const newGrid = this.grid.map(g => [...g]) // This is soooooo wrong

    this.eachCell((x, y, val) => {
      const neighbors = this.getNeighbors(x, y)

      let alive = 0

      neighbors.forEach(neighbor => {
        if (neighbor[2] === 1) {
          alive += 1
        }
      })

      // Any live cell with fewer than two live neighbors dies, by underpopulation
      if (val === 1 && alive < 2) {
        newGrid[y][x] = 0
      }

      // Any live cell with more than three live neighbors dies, as if by overpopulation.
      if (val === 1 && alive > 3) {
        newGrid[y][x] = 0
      }

      // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
      if (val === 0 && alive === 3) {
        newGrid[y][x] = 1
      }
    })

    this.grid = newGrid
  }

  getNeighbors (x, y) {
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
    }).map(xy => xy.concat([this.grid[xy[1]][xy[0]]]))
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

  getGrid () {
    let gridText = ''
    this.grid.forEach(y => {
      y.forEach(x => {
        gridText += `${x !== 0 ? '*' : '  '}`
      })

      gridText += '\n'
    })

    return gridText
  }
}

module.exports = GameOfLife
