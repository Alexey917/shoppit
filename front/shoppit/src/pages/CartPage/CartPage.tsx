import React from 'react';
import { ShoppingCart } from '@/modules';

import classes from './CartPage.module.css';

export const CartPage = () => {
  return (
    <main>
      <div className={classes.wrapper}>
        <ShoppingCart />
        {/* <CartSummary /> */}
      </div>
    </main>
  );
};
