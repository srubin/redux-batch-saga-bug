import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value (2x)"
          onClick={() => dispatch([decrement(), decrement()])}
        >
          - 2x (batch)
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value (then 2x decrement)"
          onClick={() => dispatch(increment())}
        >
          + (then dec 2x in batch from saga)
        </button>
      </div>
    </div>
  );
}
