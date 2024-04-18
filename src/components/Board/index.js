import cx from 'classnames';
import { Cell } from '../Cell';
import styles from './styles.module.scss';

export const Board = ({ state, showBorders }) => (
  <div className={cx(styles.board, { [styles.borders]: showBorders })}>
    {state.map((row, rowIndex) => (
      <div className={styles.row} key={rowIndex}>
        {row.map((state, index) => <Cell key={index} state={state} />)}
      </div>
    ))}
  </div>
);
