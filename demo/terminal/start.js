#!/usr/bin/env node

const {Board, Game} = require('../..')
const readline = require('readline')

let columns = (process.stdout.columns / 2)
let rows = process.stdout.rows - 4
let defaultCells = Math.round(columns * rows / 6)
let board = new Board([columns, rows])
let game = new Game(board, {defaultCells, fps: 2})
let frame = 0
game.on('board.change', board => {
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)
  console.log(`Generation: ${frame++}    Cells: ${board.getCellCount()}/${columns * rows} (${defaultCells})\n`)
  let out = board.asGrid()
    .map(row => row.join(' '))
    .join('\n')
  console.log(out)
})
game.start()
