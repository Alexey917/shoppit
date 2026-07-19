import React from 'react';

import classes from './OrderHistory.module.css';

export const OrderHistory = () => {
  return (
    <article className={classes.history}>
      <h2 className={classes.title}>Order History</h2>
      <ul className={classes.list}>
        <li className={classes.item}>
          {/* <img src="" alt="" className={classes.img} /> */}
          <div className={classes.wrapper}>
            <p className={classes.textWrapper}>Product Name</p>
            <p className={classes.textWrapper}>Order Date:</p>
            <p className={classes.textWrapper}>Order ID:</p>
          </div>
          <p className={classes.text}>Quantity:</p>
          <p className={classes.text}>$100.00</p>
        </li>
      </ul>
    </article>
  );
};
