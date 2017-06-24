// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
module.exports = (lives, neighbourCount, live, die) => {
  if (!lives && neighbourCount === 3) live()
}
