import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import styles from './CheckoutSummary.module.css'
 
const checkoutSummary = (props) => {
 
    return (
        <div className={styles.CheckoutSummary}>
            <h1>Here is the burger you have built</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
            clicked={props.checkoutCancelled}
            btnType={'Danger'}>Cancel</Button>
            <Button 
            clicked={props.checkoutContinued}            
            btnType={'Success'}>Continue</Button>
        </div>
    )
};
 
export default checkoutSummary;