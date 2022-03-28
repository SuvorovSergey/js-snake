class Snake {
  constructor (game) {
    this.game = game
    this.headColor = '#0d5424'
    this.bodyColor = '#107718'
    this.direction = 'RIGHT'
    this.head = { x: 0, y: 0 }
    this.body = []
    this.dimension = {
      x: this.game.width / this.game.scale,
      y: this.game.height / this.game.scale,
    }
  }

  draw (ctx) {
    ctx.fillStyle = this.bodyColor
    for (let i = 0; i < this.body.length; i++) {
      ctx.fillRect(this.body[i].x, this.body[i].y, this.dimension.x, this.dimension.y)
    }
    ctx.fillStyle = this.headColor
    ctx.fillRect(this.head.x, this.head.y, this.dimension.x, this.dimension.y)
  }

  update (dt) {
    if (!dt) {
      return
    }
    switch (this.direction) {
      case 'RIGHT':
        this.moveRight()
        break
      case 'LEFT':
        this.moveLeft()
        break
      case 'UP':
        this.moveUp()
        break
      case 'DOWN':
        this.moveDown()
        break
    }

    // collision canvas border
    if (this.head.x > this.game.width - this.dimension.x
      || this.head.x < 0
      || this.head.y > this.game.height - this.dimension.y
      || this.head.y < 0) {
      this.game.state = this.game.states.GAME_OVER
    }

    // collision self
    this.body.forEach( item => {
      if (item.x === this.head.x && item.y === this.head.y) {
        this.game.state = this.game.states.GAME_OVER
      }
    })

    this.body.pop()
    this.body.unshift({
      x: this.head.x,
      y: this.head.y,
    })

  }

  moveLeft () {
    this.head.x -= this.dimension.x
  }

  moveRight () {
    this.head.x += this.dimension.x
  }

  moveDown () {
    this.head.y += this.dimension.y
  }

  moveUp () {
    this.head.y -= this.dimension.y
  }

  eat () {
    this.body.unshift({
      x: this.head.x,
      y: this.head.y,
    })
    this.game.score++
  }
}
