module.exports = class Cell {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  setBoard(board) {
    this.board = board
  }

  isNeighbourOf(cell) {
    return this.x - cell.x >= -1 &&
      this.x - cell.x <= 1 &&
      this.y - cell.y >= -1 &&
      this.y - cell.y <= 1
  }

  getNeighbourCount() {
    return this.board.cells
      .filter(c => c !== this)
      .filter(c => this.isNeighbourOf(c))
      .length
  }

  toString() {
    return `${this.x}/${this.y}`
  }
}
