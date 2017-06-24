// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
module.exports = (lives, neighbourCount, live, die) => {
  if (lives && neighbourCount < 2) die()
}
