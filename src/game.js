class Game {
  constructor () {
    this.canvas = document.getElementById('game')
    this.ctx = this.canvas.getContext('2d')
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.scale = 20
    this.rows = this.canvas.height / (this.canvas.height / this.scale)
    this.columns = this.canvas.width / (this.canvas.width / this.scale)
    this.fps = 7
    this.score = 0
    this.states = {
      MENU: 0,
      RUNNING: 1,
      GAME_OVER: 2,
    }
    this.state = this.states.MENU
  }

  start () {
    this.score = 0;
    this.snake = new Snake(this)
    this.food = new Food(this)
    new InputHandler(this.snake, this)
    this.food.randomPosition()
  }

  update (dt) {
    if (this.state !== this.states.RUNNING) {
      return
    }
    this.snake.update(dt)
    if (this.snake.head.x === this.food.position.x &&
      this.snake.head.y === this.food.position.y) {
      this.snake.eat()
      this.food.randomPosition()
    }
  }

  draw () {
    if (this.state === this.states.MENU) {
      this.ctx.clearRect(0, 0, this.width, this.height)
      this.ctx.font = '30px Arial'
      this.ctx.fillStyle = '#000'
      this.ctx.textAlign = 'center'
      this.ctx.fillText('SNAKE', this.width / 2, (this.height / 2) - 20)
      this.ctx.font = '20px Arial'
      this.ctx.fillText('Press SPACE to begin', this.width / 2, (this.height / 2) + 20)
    }

    if (this.state === this.states.GAME_OVER) {
      this.ctx.rect(0, 0, this.width, this.height)
      this.ctx.fillStyle = 'rgba(0,0,0,0.5)'
      this.ctx.fill()
      this.ctx.font = '30px Arial'
      this.ctx.fillStyle = '#fff'
      this.ctx.textAlign = 'center'
      this.ctx.fillText('Game Over', this.width / 2, (this.height / 2) - 20)
      this.ctx.fillText('Your score: ' + this.score, this.width / 2, (this.height / 2) + 20)
      this.ctx.font = '16px Arial'
      this.ctx.fillText('Press SPACE to retry', this.width / 2, (this.height / 2) + 60)
    }

    if (this.state === this.states.RUNNING) {
      this.ctx.clearRect(0, 0, this.width, this.height)
      this.snake.draw(this.ctx)
      this.food.draw(this.ctx)
      this.grid()
    }
  }

  grid () {
    this.ctx.strokeStyle = '#fff'
    for (let i = 0; i < this.rows; i++) {
      this.ctx.beginPath()
      this.ctx.moveTo(0, (this.canvas.height / this.scale) * i)
      this.ctx.lineTo(this.canvas.width, (this.canvas.height / this.scale) * i)
      this.ctx.stroke()
    }
    for (let i = 0; i < this.columns; i++) {
      this.ctx.beginPath()
      this.ctx.moveTo((this.canvas.width / this.scale) * i, 0)
      this.ctx.lineTo((this.canvas.width / this.scale) * i, this.canvas.height)
      this.ctx.stroke()
    }
  }
}
