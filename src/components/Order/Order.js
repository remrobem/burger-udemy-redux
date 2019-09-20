import React from 'react';
import styles from './Order.module.css';

const order = (props) => {

    const ingredients = [];

    for (let ingredient in props.ingredients) {
        ingredients.push(
            {
                name: ingredient,
                amount: props.ingredients[ingredient],
            }
        )
    }

    const ingredientOutput = ingredients.map((ingredient) => {
        return (
                <li key={ingredient.name}>
                    <span >{ingredient.name}:  {ingredient.amount} </span>
                </li>
        )
    })
    return (
        <div className={styles.Order}>
            <p>Ingredients: {ingredientOutput} </p>
            <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        </div>
    )
};

export default order;