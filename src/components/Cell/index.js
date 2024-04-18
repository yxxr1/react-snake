import { memo } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

export const STATES = {
  EMPTY: 1,
  SNAKE_HEAD: 2,
  SNAKE_BODY: 3,
  TARGET: 4,
}

export const Cell = memo(({ state }) => (
  <div className={styles.cell}>
    <div className={cx(styles.content, {
      [styles.body]: state === STATES.SNAKE_BODY,
      [styles.head]: state === STATES.SNAKE_HEAD,
      [styles.target]: state === STATES.TARGET,
    })} />
  </div>
));
