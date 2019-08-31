import React from 'react';
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: "Meat", type: "meat" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Salad", type: "salad" },
];

const buildControls = (props) => (
    <div className={styles.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map((control) => {
            return <BuildControl
                key={control.label}
                label={control.label}
                added={() => props.ingredientAdded(control.type)}
                removed={() => props.ingredientRemoved(control.type)}
                disabled={props.disabled[control.type]} />
        })}
        <button
            className={styles.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}>ORDER NOW</button>
    </div>


);

export default buildControls;