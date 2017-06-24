const assert = require('assert')
const GameLoop = require('../lib/game-loop')

describe('Game Loop', () => {
  it('should reach > 10 fps', () => {
    let loop = new GameLoop(200)
    let ticks = 0
    loop.on('tick', () => ticks++)
    return new Promise((resolve, reject) => {
      loop.start()
      setTimeout(() => {
        loop.stop()
        assert.ok(ticks > 10)
        resolve()
      }, 100)
    })
  })

  it('should reach < 10 fps', () => {
    let loop = new GameLoop(20)
    let ticks = 0
    loop.on('tick', () => ticks++)
    return new Promise((resolve, reject) => {
      loop.start()
      setTimeout(() => {
        loop.stop()
        assert.ok(ticks < 10)
        resolve()
      }, 100)
    })
  })
})
