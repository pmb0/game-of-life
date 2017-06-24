const assert = require('assert')
const Board = require('../lib/board')
const Cell = require('../lib/cell')

describe('Cell', () => {
  it('should accept coordinates', () => {
    let cell = new Cell(3, 4)
    assert.equal(cell.x, 3)
    assert.equal(cell.y, 4)
  })

  it('should detect neighbours', () => {
    let c1 = new Cell(0, 0)
    let c2 = new Cell(0, 1)
    let c3 = new Cell(1, 1)
    let c4 = new Cell(10, 10)
    assert.ok(c1.isNeighbourOf(c2))
    assert.ok(c2.isNeighbourOf(c1))
    assert.ok(c2.isNeighbourOf(c3))
    assert.ok(c1.isNeighbourOf(c3))
    assert.ok(!c1.isNeighbourOf(c4))
  })

  it('should know neighbour count', () => {
    let board = new Board()
    let c1 = new Cell(0, 0)
    let c2 = new Cell(0, 1)
    board.add(c1)
    board.add(c2)
    assert.equal(c1.getNeighbourCount(), 1)
  })
})
