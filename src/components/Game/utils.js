import { STATES } from '../Cell';

export const getBoard = (rows, cols, snake, target) => {
  const isLeftCell = (leftCell, compareCell) => (
    ((leftCell[1] + 1) % cols) === compareCell[1]
  );
  const isRightCell = (rightCell, compareCell) => {
    const prev = rightCell[1] - 1;

    return (prev < 0 ? prev + cols : prev) === compareCell[1]
  };
  const isTopCell = (topCell, compareCell) => (
    ((topCell[0] + 1) % rows) === compareCell[0]
  );
  const isBottomCell = (bottomCell, compareCell) => {
    const prev = bottomCell[0] - 1;

    return (prev < 0 ? prev + rows : prev) === compareCell[0];
  };

  const board = [];

  for (let row = 0; row < rows; row++) {
    board[row] = [];

    for (let col = 0; col < cols; col++) {
      board[row][col] = STATES.EMPTY;
    }
  }

  board[snake[0][0]][snake[0][1]] = STATES.SNAKE_HEAD;

  for (let i = 1; i < snake.length - 1; i++) {
    const currentCell = snake[i];
    const prevCell = snake[i - 1];
    const nextCell = snake[i + 1];
    let cellState;

    if (prevCell[0] === currentCell[0] && nextCell[0] === currentCell[0]) {
      cellState = STATES.SNAKE_BODY_HORIZONTAL;
    } else if (prevCell[1] === currentCell[1] && nextCell[1] === currentCell[1]) {
      cellState = STATES.SNAKE_BODY_VERTICAL;
    } else if ((isLeftCell(prevCell, currentCell) && isTopCell(nextCell, currentCell)) || (isLeftCell(nextCell, currentCell) && isTopCell(prevCell, currentCell))) {
      cellState = STATES.SNAKE_BODY_LEFT_TOP;
    } else if ((isRightCell(prevCell, currentCell) && isTopCell(nextCell, currentCell)) || (isRightCell(nextCell, currentCell) && isTopCell(prevCell, currentCell))) {
      cellState = STATES.SNAKE_BODY_RIGHT_TOP;
    } else if ((isLeftCell(prevCell, currentCell) && isBottomCell(nextCell, currentCell)) || (isLeftCell(nextCell, currentCell) && isBottomCell(prevCell, currentCell))) {
      cellState = STATES.SNAKE_BODY_LEFT_BOTTOM;
    } if ((isRightCell(prevCell, currentCell) && isBottomCell(nextCell, currentCell)) || (isRightCell(nextCell, currentCell) && isBottomCell(prevCell, currentCell))) {
      cellState = STATES.SNAKE_BODY_RIGHT_BOTTOM;
    }

    board[currentCell[0]][currentCell[1]] = cellState;
  }

  if (snake.length > 1) {
    const lastCell = snake[snake.length - 1];
    const prevLastCell = snake[snake.length - 2];
    board[lastCell[0]][lastCell[1]] = lastCell[0] === prevLastCell[0] ? STATES.SNAKE_BODY_HORIZONTAL : STATES.SNAKE_BODY_VERTICAL;
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
