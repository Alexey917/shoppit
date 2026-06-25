import { useEffect, useState } from 'react';
import type { ICart, ICartItem } from '@/api/client';
import { useFetchApi } from '@/hooks';
import { Button, Spin } from 'antd';
import { client } from '@/api/client';
import { getErrorMessage } from '@/api/errorHandler';

import classes from './CartSummary.module.css';

interface ICartSummary {
  cartTotal: number;
  setCartTotal: (total: number) => void;
}

interface IUpdate {
  data: ICartItem;
  message: string;
  total_sum: number;
}

export const CartSummary = ({ cartTotal, setCartTotal }: ICartSummary) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const cartCode = localStorage.getItem('cart_code');

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const response = await client.get<ICart<ICartItem>>(
          `/get_cart?cart_code=${cartCode}`,
        );
        setCartTotal(response.data.sum_total);
      } catch (e: unknown) {
        const errorMessage = getErrorMessage(e);
        console.log(errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, []);

  const tax: number = 4.0;
  console.log('cartTotal:', cartTotal);

  if (loading) {
    return (
      <section className={classes.CartSummary}>
        <Spin />
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className={classes.CartSummary}>
          <span className={classes.error}>{error}</span>
        </div>
      </section>
    );
  }

  return (
    <section className={classes.CartSummary}>
      <div className={classes.wrapper}>
        <h2 className={classes.title}>Cart Summary</h2>
        <p className={classes.subtotal}>
          <span className={classes.text}>Subtotal:</span>
          {cartTotal && (
            <span className={classes.text}>{`$ ${cartTotal.toFixed(2)}`}</span>
          )}
        </p>
        <p className={classes.tax}>
          <span className={classes.text}>Tax:</span>
          <span className={classes.text}>{`$ ${tax.toFixed(2)}`}</span>
        </p>
        <p className={classes.total}>
          <span className={classes.text}>Total:</span>
          {cartTotal && (
            <span
              className={classes.textTotal}
            >{`$ ${(cartTotal + tax).toFixed(2)}`}</span>
          )}
        </p>
        <Button color="purple" variant="solid" className={classes.btn}>
          Proceed to Checkout
        </Button>
      </div>
    </section>
  );
};
