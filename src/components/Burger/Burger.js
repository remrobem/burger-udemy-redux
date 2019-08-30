import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // ingredientList : array of <BurgerIngredient />
    // Object.keys(props.ingredients) : converts props object to array of key fields (meat, cheese,...)
    let ingredientList = Object.keys(props.ingredients)
        .map((igKey) => {
            // done to get correct number of entries for each key
            // props.ingredients[igKey] = value (1,2,..)
            // Array(x) : creates empty array with x entries for each key
            // [...Array(x)] : spread values into new array with x entries
            // note that [Array(x)] creates array with length x but no entries. this also works in app
            // [...Array(props.ingredients[igKey]) : new empty array with  = value (1,2,...)
            return [...Array(props.ingredients[igKey])]
                .map((_, i) => {
                    return <BurgerIngredient key={igKey + i} type={igKey} /> // unique key and key field from props
                })
        })
        // flatten the array before checking to see if any entries exist
        // if el is empty, reduce skips it
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    console.log(ingredientList)
    if (ingredientList.length === 0) {
        ingredientList = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type='bread-top' />
            {ingredientList}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default burger;
