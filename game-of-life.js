const assert = require('assert')

class Game {
  constructor(livingCells = []) {
    this.livingCells = livingCells
  }

  isLiving(cell) {
    return this.livingCells
      .filter(c => c[0] === cell[0] && c[1] === cell[1])
      .length === 1
  }

  getLivingNeighboursNumber(cell) {
    return this.livingCells
      .filter(c => {
        return cell[0] - c[0] >= -1 && cell[1] - c[1] <= 1 &&
          cell[1] - c[1] >= -1 && cell[1] - c[1] <= 1
      })
      .length
  }

  getLivingCellNumber() {
    return this.livingCells.length
  }

  tick() {
    this.livingCells = this.livingCells
      .filter(c => this.getLivingNeighboursNumber(c) >= 2)
  }
}

describe('Game of Life', function() {
  it('construct a game object', () => {
    assert.doesNotThrow(() => new Game())
  })

  it('should create a game containing living cells', () => {
    let g = new Game([[1, 1], [1, 2]])
    assert.ok(g.isLiving([1, 1]))
  })

  it('should have three living neighbours', () => {
    let g = new Game([[0, 2], [1, 2], [2, 0]])
    assert.equal(3, g.getLivingNeighboursNumber([1, 1]))
    assert.equal(2, g.getLivingNeighboursNumber([1, 3]))
    assert.equal(0, g.getLivingNeighboursNumber([10, 10]))
  })

  it('underpopulation causes death', () => {
    let g = new Game([[0, 0], [110, 110]])
    assert.equal(g.getLivingCellNumber(), 2)
    g.tick()
    assert.equal(g.getLivingCellNumber(), 0)
  })

  it('should survive with two or three neighbours', () => {
    let g = new Game([[0, 0], [0, 1], [110, 110], [110, 111]])
    assert.equal(g.getLivingCellNumber(), 4)
    g.tick()
    assert.equal(g.getLivingCellNumber(), 4)
  })
})
