import { useState } from 'react';
import styles from './styles.module.scss';

export const Settings = ({ values, onChange }) => {
  const [rows, setRows] = useState(values.rows);
  const [cols, setCols] = useState(values.cols);
  const [tickTime, setTickTime] = useState(values.tickTime);
  const [borders, setBorders] = useState(values.borders);

  return (
    <form onSubmit={(e) => {e.preventDefault(); onChange({ rows, cols, tickTime, borders })}}>
      <label className={styles.input}>
        Rows: <input type="number" min={10} max={20} value={rows} onChange={(e) => setRows(e.target.value)} />
        <span className={styles['current-value']}>current: {values.rows}</span>
      </label>

      <label className={styles.input}>
        Cols: <input type="number" min={10} max={20} value={cols} onChange={(e) => setCols(e.target.value)} />
        <span className={styles['current-value']}>current: {values.cols}</span>
      </label>

      <label className={styles.input}>
        Tick time: <input type="number" min={50} max={1000} value={tickTime} onChange={(e) => setTickTime(e.target.value)} />
        <span className={styles['current-value']}>current: {values.tickTime}</span>
      </label>

      <label className={styles.input}>
        Borders: <input type="checkbox" checked={borders} onChange={(e) => setBorders(e.target.checked)} />
        <span className={styles['current-value']}>current: {values.borders ? 'enabled' : 'disabled'}</span>
      </label>

      <button>apply</button>
    </form>
  )
}
