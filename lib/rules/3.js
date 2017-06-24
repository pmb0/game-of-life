// Any live cell with more than three live neighbours dies, as if by overpopulation.
module.exports = (lives, neighbourCount, live, die) => {
  if (lives && neighbourCount > 3) die()
}
