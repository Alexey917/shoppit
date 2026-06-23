import type { ICartItem } from '@/api/client';
import React from 'react';
import { Button } from 'antd';

import classes from './CartItem.module.css';

export const CartItem = ({ product }: ICartItem) => {
  return (
    <article className={classes.cartItem}>
      <img src={product.image} alt={product.name} className={classes.img} />
      <div className={classes.infoGroup}>
        <h3 className={classes.title}>{product.name}</h3>
        <p className={classes.price}>{product.price}</p>
      </div>
      <input type="number" placeholder="1" className={classes.input} />
      <Button color="danger" variant="solid">
        Удалить
      </Button>
    </article>
  );
};
