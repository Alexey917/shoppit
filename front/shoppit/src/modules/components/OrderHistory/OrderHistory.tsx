import React from 'react';

import type { IUser } from '@/modules/Profile/Profile';

import classes from './OrderHistory.module.css';
import { FormatDate } from '@/utils';

interface IOrderHistory {
  user: IUser;
}

export const OrderHistory = ({ user }: IOrderHistory) => {
  return (
    <article className={classes.history}>
      <h2 className={classes.title}>Order History</h2>
      <ul className={classes.list}>
        {user.items.map((item) => (
          <li className={classes.item}>
            <img
              src={item.product.image}
              alt={item.product.name}
              className={classes.img}
            />
            <div className={classes.wrapper}>
              <p className={classes.textWrapper}>{item.product.name}</p>
              <p className={classes.textWrapper}>
                {`Order Date: ${FormatDate(item.order_date)}`}
              </p>
              <p className={classes.textWrapper}>
                {`Order ID: ${item.order_id}`}
              </p>
            </div>
            <p className={classes.text}>{`Quantity: ${item.quantity}`}</p>
            <p className={classes.text}>{item.product.price}</p>
          </li>
        ))}
      </ul>
    </article>
  );
};
