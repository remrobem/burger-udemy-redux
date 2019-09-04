import React from 'react';
import styles from './Spinner.module.css';

const spinner = () => (
    <div className={styles.Modal}>
        <div className={styles.Loader}>Loading...</div>
    </div>
);

export default spinner;