class InputHandler {
  constructor (snake, game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          if (snake.direction === 'RIGHT') {
            break;
          }
          snake.direction = 'LEFT';
          break;

        case 38:
          if (snake.direction === 'DOWN') {
            break;
          }
          snake.direction = 'UP';
          break;

        case 39:
          if (snake.direction === 'LEFT') {
            break;
          }
          snake.direction = 'RIGHT';
          break;

        case 40:
          if (snake.direction === 'UP') {
            break;
          }
          snake.direction = 'DOWN';
          break;

        case 32:
          if (game.state !== game.states.RUNNING) {
            game.state = game.states.RUNNING
            game.start()
          }
          break;
      }
    });
  }
}