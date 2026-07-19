import type { ICartItem, IProduct } from '@/api/client';
import React from 'react';

import classes from './OrderItem.module.css';

interface IOrderItem {
  product: IProduct;
  quantity: number;
}

export const OrderItem = ({ product, quantity }: IOrderItem) => {
  return (
    <article className={classes.orderItem}>
      <img src={product.image} alt={product.name} className={classes.img} />
      <div className={classes.info}>
        <h3 className={classes.title}>{product.name}</h3>
        <p className={classes.quantity}>{`Количество: ${quantity}`}</p>
      </div>
      <p className={classes.price}>{`$ ${product.price}`}</p>
    </article>
  );
};
