import React from 'react';
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import styles from "./checkoutSummary.module.css";

const checkoutSummary = (props) => {
    return (<div className={styles.CheckoutSummary}>
        <h1>We hope its taste well!</h1>
        <div style={{ width: '100%', height: '400px', margin: 'auto' }}>
            <Burger ingridients={props.ingridients} />
        </div>
        <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
    </div>);
};

export default checkoutSummary;