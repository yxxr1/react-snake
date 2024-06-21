import { memo } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

export const STATES = {
  EMPTY: 1,
  SNAKE_HEAD: 2,
  SNAKE_BODY_HORIZONTAL: 3,
  SNAKE_BODY_VERTICAL: 4,
  SNAKE_BODY_LEFT_TOP: 5,
  SNAKE_BODY_RIGHT_TOP: 6,
  SNAKE_BODY_LEFT_BOTTOM: 7,
  SNAKE_BODY_RIGHT_BOTTOM: 8,
  TARGET: 9,
};

export const Cell = memo(({ state }) => (
  <div className={styles.cell}>
    <div className={cx(styles.content, {
      [styles.body]: state >= STATES.SNAKE_BODY_HORIZONTAL && state <= STATES.SNAKE_BODY_RIGHT_BOTTOM,
      [styles.head]: state === STATES.SNAKE_HEAD,
      [styles.target]: state === STATES.TARGET,
      [styles['body-horizontal']]: state === STATES.SNAKE_BODY_HORIZONTAL,
      [styles['body-vertical']]: state === STATES.SNAKE_BODY_VERTICAL,
      [styles['body-left-top']]: state === STATES.SNAKE_BODY_LEFT_TOP,
      [styles['body-right-top']]: state === STATES.SNAKE_BODY_RIGHT_TOP,
      [styles['body-left-bottom']]: state === STATES.SNAKE_BODY_LEFT_BOTTOM,
      [styles['body-right-bottom']]: state === STATES.SNAKE_BODY_RIGHT_BOTTOM,
    })} />
  </div>
));
