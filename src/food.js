class Food {
  constructor (game) {
    this.game = game
    this.color = '#ec0f4d'
    this.position = {
      x: 0,
      y: 0,
    }
  }

  randomPosition () {
    this.position.x = Math.floor(Math.random() * (this.game.columns - 1)) * (this.game.width / this.game.scale)
    this.position.y = Math.floor(Math.random() * (this.game.rows - 1)) * (this.game.height / this.game.scale)
  }

  draw (ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.game.width / this.game.scale, this.game.height / this.game.scale)
  }
}
