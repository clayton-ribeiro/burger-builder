import React from 'react';
import styles from "./Order.module.css";

const Order = (props) => {
  const ingridients = [];
  for (const key in props.ingridients) {
    ingridients.push({ name: key, amount: props.ingridients[key] });
  }

  const ingridientsOutput = ingridients.map(ig => {
    return <span style={{
      textTransform: 'capitalize',
      display: 'inline-block',
      margin: '0 8px',
      border: '1px solid #ccc',
      padding: '5px'
    }} key={ig.name} >{ig.name} ({ig.amount})</span>;
  });
  return (<div className={styles.Order}>
    <p>Ingridients: {ingridientsOutput}</p>
    <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
  </div>);
};

export default Order;