const assert = require('assert')
const Game = require('../lib/game')

describe('Game', () => {
  it('should receive an event when game starts', done => {
    let game = new Game()
    game.on('start', () => done())
    game.start()
    game.end()
  })

  it('should receive an event when game ends', done => {
    let game = new Game()
    game.on('end', () => done())
    game.start()
    game.end()
  })

  it('should tick several times in 100 ms after game starts', done => {
    let game = new Game(undefined, {fps: 30})
    game.start()
    let ticks = 0
    game._tick = () => ticks++
    setTimeout(() => {
      game.end()
      assert.ok(ticks > 1)
      done()
    }, 100)
  })
})
