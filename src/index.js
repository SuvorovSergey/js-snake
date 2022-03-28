let game = new Game()
game.start()

let lastTime = 0

function loop (timestamp) {
  let dt = timestamp - lastTime
  if (timestamp < lastTime + (1000 / game.fps)) {
    requestAnimationFrame(loop)
    return
  }
  lastTime = timestamp
  game.update(dt)
  game.draw()
  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)