const {EventEmitter} = require('events')

module.exports = class GameLoop extends EventEmitter {
  constructor(fps = 30) {
    super()
    this.fps = fps
    this.ticks = 0
    this.lastTick = 0
  }

  get tickLength() {
    return 1000 / this.fps
  }

  _tick() {
    if (!this._running) return
    let now = Date.now()

    this.ticks++
    if (this.lastTick + this.tickLength <= now) {
      this.lastTick = now
      let delta = (now - this.lastTick) / 1000
      this.emit('tick', delta)
      this.ticks = 0
    }

    if (Date.now() - this.lastTick < this.tickLength - 16) {
      setTimeout(() => this._tick())
    } else {
      setImmediate(() => this._tick())
    }
  }

  start() {
    this._running = true
    this._tick()
  }

  stop() {
    this._running = false
  }
}
