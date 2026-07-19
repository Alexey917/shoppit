import { useState } from 'react';
import { ShoppingCart, CartSummary } from '@/modules';

import classes from './CartPage.module.css';

export const CartPage = () => {
  const [cartTotal, setCartTotal] = useState<number>(0);

  return (
    <main>
      <div className={classes.wrapper}>
        <ShoppingCart setCartTotal={setCartTotal} />
        <CartSummary cartTotal={cartTotal} setCartTotal={setCartTotal} />
      </div>
    </main>
  );
};
