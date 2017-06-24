const {EventEmitter} = require('events')
const Cell = require('./cell')

module.exports = class Board extends EventEmitter {
  constructor(area = [10, 10]) {
    super()
    this.area = area
    this.cells = []
  }

  get maxCellCount() {
    return (this.area[0] + 1) * (this.area[1] + 1)
  }

  add(cell) {
    if (this.hasCell(cell)) throw new Error('cell does already exist: ' + cell)
    cell.setBoard(this)
    this.cells.push(cell)
    this.emit('cell.added', cell)
  }

  // TODO testme
  remove(cell) {
    let index = this.cells.indexOf(cell)
    if (index > -1) this.cells.splice(index, 1)
  }

  getCellAt(x, y) {
    return this.cells.filter(c => c.x === x && c.y === y)[0]
  }

  hasCell(cell) {
    return this.getCellAt(cell.x, cell.y) instanceof Cell
  }

  getCellCount() {
    return this.cells.length
  }

  defaultFormatter(cell) {
    return cell instanceof Cell ? '◉' : '·'
  }

  traverse(fn) {
    for (let y = 0; y < this.area[1]; y++) {
      for (let x = 0; x < this.area[0]; x++) {
        fn(y, x, this.getCellAt(x, y) || null)
      }
    }
  }

  getNeighbourCountFor(x, y) {
    return this.cells.filter(c => {
      return c.x - x >= -1 && c.x - x <= 1 && c.y - y >= -1 && c.y - y <= 1
    }).length
  }

  asGrid(formatter = this.defaultFormatter) {
    let rows = []
    for (let _row = 0; _row < this.area[1]; _row++) {
      let row = []
      for (let _column = 0; _column < this.area[0]; _column++) {
        let cell = this.getCellAt(_column, _row) || null
        row.push(formatter(cell))
      }
      rows.push(row)
    }
    return rows
  }
}
