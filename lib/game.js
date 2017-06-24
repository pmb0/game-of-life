const {EventEmitter} = require('events')
const Board = require('./board')
const Cell = require('./cell')
const CellSpawner = require('./cell-spawner')
const GameLoop = require('./game-loop')
const rules = require('./rules')

module.exports = class Game extends EventEmitter {
  constructor(board = new Board(), {defaultCells = 10, fps = 10} = {}) {
    if (!(board instanceof Board)) throw new TypeError('unknown board')
    super()
    this.board = board
    this.defaultCells = defaultCells
    this.fps = fps
    this.cellSpawner = new CellSpawner()
    this.loop = new GameLoop(fps)

    this.loop.on('tick', () => this._tick())

    this.on('start', () => console.log('Starting simulator ...'))
    this.on('stop', () => console.log('Stopping simulator ...'))

    // Forward some events
    this.board.on('cell.added', cell => this.emit('cell.added', cell))
  }

  _tick() {
    let newBoard = new Board(this.board.area)

    for (let rule of rules) {
      this.board.traverse((y, x, cell) => {
        let lives = cell !== null
        let neighbourCount = this.board.getNeighbourCountFor(x, y)
        cell = cell || new Cell(x, y)

        let live = () => {
          newBoard.add(cell)
          this.emit('cell.resurrected')
        }
        let die = () => {
          this.emit('cell.died')
        }
        // console.log('check rule', lives, neighbourCount)
        rule(lives, neighbourCount, live, die)
      })
    }
    this.board = newBoard
    this.emit('board.change', this.board)
  }

  start() {
    this.emit('start', this.board)
    this.cellSpawner.add(this.defaultCells, this.board)
    this.loop.start()
  }

  end() {
    this.loop.stop()
    this.emit('end')
  }
}
