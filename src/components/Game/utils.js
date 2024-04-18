import { STATES } from '../Cell';

export const getBoard = (rows, cols, snake, target) => {
  const board = [];

  for (let row = 0; row < rows; row++) {
    board[row] = [];

    for (let col = 0; col < cols; col++) {
      board[row][col] = STATES.EMPTY;
    }
  }

  board[snake[0][0]][snake[0][1]] = STATES.SNAKE_HEAD;

  for (let i = 1; i < snake.length; i++) {
    board[snake[i][0]][snake[i][1]] = STATES.SNAKE_BODY;
  }

  if (target) {
    board[target[0]][target[1]] = STATES.TARGET;
  }

  return board;
}

export const generateTarget = (rows, cols, snake) => {
  const freeCells = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isInSnake = snake.find(([snakeRow, snakeCol]) => snakeRow === row && snakeCol === col);

      if (!isInSnake) {
        freeCells.push([row, col]);
      }
    }
  }

  if (!freeCells.length) {
    return null;
  }

  const targetIndex = Math.round(Math.random() * (freeCells.length - 1));

  return freeCells[targetIndex];
}
