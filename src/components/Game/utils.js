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

export const generateTarget = (rows, cols, board, snake) => {
  const freeCellsCount = (rows * cols) - snake.length;

  if (!freeCellsCount) {
    return null;
  }

  let targetIndex = Math.round(Math.random() * (freeCellsCount - 1));

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col] === STATES.EMPTY) {
        if (targetIndex === 0) {
          board[row][col] = STATES.TARGET;
          return [row, col];
        }

        targetIndex--;
      }
    }
  }
}
