import React from 'react';
import styles from './Button.module.css';

const button = (props) => (
    <button
        onClick={props.clicked}
        // className needs to be a string
        // this crrates array of styles, including dynamic stlye, then join to a string
        className={[styles.Button, styles[props.btnType]].join(' ')}>
        {props.children}
    </button>
);

export default button;