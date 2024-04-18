import { useState, useEffect } from 'react';
import { Board } from '../Board';
import { getBoard, generateTarget } from './utils';
import { KEYS_MAP, DIRECTIONS } from './const';
import styles from './styles.module.scss';


export const Game = ({ config: { rows, cols, tickTime, borders } }) => {
  const [snake, setSnake] = useState(null);
  const [snakeDirection, setSnakeDirection] = useState(null);
  const [inputSnakeDirection, setInputSnakeDirection] = useState(null);
  const [target, setTarget] = useState(null);
  const [ticks, setTicks] = useState(0);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    if (!isOver) {
      const initSnake = [[Math.floor(rows / 2), Math.floor(cols / 2)]];
      setSnake(initSnake);
      setSnakeDirection(DIRECTIONS.LEFT);
      setInputSnakeDirection(DIRECTIONS.LEFT);
      setTarget(generateTarget(rows, cols, initSnake));
      setTicks(0);

      const interval = setInterval(() => setTicks(ticks => ticks + 1), tickTime);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isOver]);

  useEffect(() => {
    if (!isOver) {
      const keyHandler = ({ keyCode }) => {
        if (keyCode === KEYS_MAP.UP) {
          if (snakeDirection !== DIRECTIONS.DOWN) {
            setInputSnakeDirection(DIRECTIONS.UP);
          }
        } else if (keyCode === KEYS_MAP.LEFT) {
          if (snakeDirection !== DIRECTIONS.RIGHT) {
            setInputSnakeDirection(DIRECTIONS.LEFT);
          }
        } else if (keyCode === KEYS_MAP.DOWN) {
          if (snakeDirection !== DIRECTIONS.UP) {
            setInputSnakeDirection(DIRECTIONS.DOWN);
          }
        }  else if (keyCode === KEYS_MAP.RIGHT) {
          if (snakeDirection !== DIRECTIONS.LEFT) {
            setInputSnakeDirection(DIRECTIONS.RIGHT);
          }
        }
      }

      window.document.addEventListener('keypress', keyHandler);

      return () => {
        window.document.removeEventListener('keypress', keyHandler);
      };
    }
  }, [isOver, snakeDirection]);

  useEffect(() => {
    if (!isOver && snake) {
      const head = snake[0];
      let nextCell;

      setSnakeDirection(inputSnakeDirection);

      if (inputSnakeDirection === DIRECTIONS.UP) {
        nextCell = [head[0] - 1, head[1]];
      } else if (inputSnakeDirection === DIRECTIONS.LEFT) {
        nextCell = [head[0], head[1] - 1];
      } else if (inputSnakeDirection === DIRECTIONS.DOWN) {
        nextCell = [head[0] + 1, head[1]];
      }  else if (inputSnakeDirection === DIRECTIONS.RIGHT) {
        nextCell = [head[0], head[1] + 1];
      }

      if (!borders) {
        nextCell = [
          nextCell[0] < 0 ? rows - 1 : nextCell[0] >= rows ? 0 : nextCell[0],
          nextCell[1] < 0 ? cols - 1 : nextCell[1] >= cols ? 0 : nextCell[1]
        ];
      } else if (nextCell[0] < 0 || nextCell[0] >= rows || nextCell[1] < 0 || nextCell[1] >= cols) {
        setIsOver(true);
        return;
      }

      const isInSnake = snake.slice(0, snake.length - 1).find(([snakeRow, snakeCol]) => snakeRow === nextCell[0] && snakeCol === nextCell[1]);

      if (isInSnake) {
        setIsOver(true);
        return;
      }

      if (target && nextCell[0] === target[0] && nextCell[1] === target[1]) {
        const newSnake = [nextCell, ...snake];
        setSnake(newSnake);
        setTarget(generateTarget(rows, cols, newSnake));
      } else {
        setSnake([nextCell, ...snake.slice(0, snake.length - 1)]);
      }
    }
  }, [ticks]);

  return (
    <div className={styles.game}>
      {snake && (
        <>
          <div>
            <h3 className={styles.header}>Score: {snake.length}{isOver ? ' (Game over)' : ''}</h3>
            {isOver ? <button className={styles['retry-button']} onClick={() => setIsOver(false)}>retry</button> : null}
          </div>

          <Board state={getBoard(rows, cols, snake, target)} showBorders={borders} />
        </>
      )}
    </div>
  );
}
