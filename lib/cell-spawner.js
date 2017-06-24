const Cell = require('./cell')

module.exports = class CellSpawner {
  constructor({density = 3} = {}) {
    this.density = density
  }

  _createCell(board) {
    return new Cell(
      Math.round(Math.random() * board.area[0]),
      Math.round(Math.random() * board.area[1]),
    )
  }

  add(count, board) {
    if (count > board.maxCellCount) {
      throw new Error('cell count exceeds board area')
    }
    for (let i = 0; i < count; i++) {
      let errs = 0
      while (true) {
        try {
          board.add(this._createCell(board))
          break
        } catch (e) {
          if (errs++ > 100) throw new Error(`could not spawn: ${e.toString()}`)
        }
      }
    }
  }
}
