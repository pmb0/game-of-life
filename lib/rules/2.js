// Any live cell with two or three live neighbours lives on to the next generation
module.exports = (lives, neighbourCount, live, die) => {
  if (lives && (neighbourCount === 2 || neighbourCount === 3)) live()
}
