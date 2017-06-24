const assert = require('assert')
const Board = require('../lib/board')
const CellSpawner = require('../lib/cell-spawner')

describe('Cell Spawner', () => {
  it('should spawn three cells which are neighbours', () => {
    let board = new Board([100, 100])
    let spawner = new CellSpawner()
    spawner.add(100, board)
    assert.equal(board.cells.length, 100)
  })

  it('should spawn max possible cell number', () => {
    let board = new Board([1, 1])
    let spawner = new CellSpawner()
    spawner.add(4, board)
  })

  it('should not try to spawn more cells then possible', () => {
    let board = new Board([2, 2])
    let spawner = new CellSpawner()
    assert.throws(() => spawner.add(100, board), 'cell count exceeds board area')
  })

  it('should spawn 800 cells an a large board', () => {
    let board = new Board([80, 40])
    let spawner = new CellSpawner()
    spawner.add(800, board)
    assert.equal(board.cells.length, 800)
  })
})
