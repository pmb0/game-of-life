const assert = require('assert')
const Board = require('../lib/board')
const Cell = require('../lib/cell')

describe('Board', () => {
  it('should store multiple cells', () => {
    let board = new Board()
    board.add(new Cell(0, 0))
    board.add(new Cell(0, 1))
    assert.equal(board.getCellCount(), 2)
    board.add(new Cell(0, 2))
    assert.equal(board.getCellCount(), 3)
  })

  it('should emit an event when a cell is added', () => {
    let board = new Board()
    let cell = new Cell()
    return new Promise((resolve, reject) => {
      board.on('cell.added', resolve)
      board.add(cell)
    })
  })

  it('assinged cells know their board', () => {
    let board = new Board()
    let cell = new Cell(0, 0)
    board.add(cell)
    assert.equal(board, cell.board)
  })

  it('should deny to add conflicting cells', () => {
    let board = new Board()
    let cell = new Cell(1, 1)
    assert.doesNotThrow(() => board.add(cell))
    assert.throws(() => board.add(cell))
  })
})
