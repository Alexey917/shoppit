import React from 'react';
import { Button } from 'antd';

import classes from './Payment.module.css';
import { client } from '@/api/client';
import { getErrorMessage } from '@/api';

export const PaymentOptions = () => {
  const cart_code = localStorage.getItem('cart_code');

  const flutterwavePayment = async () => {
    try {
      const response = await client.post('initial_payment/', {
        cart_code: cart_code,
      });
      window.location.href = response.data.data.link;
      console.log(response.data);
    } catch (e: unknown) {
      const errorMessage = getErrorMessage(e);
      console.log(errorMessage);
    }
  };

  const payPalPayment = async () => {
    try {
      const response = await client.post('initial_paypal_payment/', {
        cart_code: cart_code,
      });
      window.location.href = response.data.approval_url;
      console.log(response.data);
    } catch (e: unknown) {
      const errorMessage = getErrorMessage(e);
      console.log(errorMessage);
    }
  };

  return (
    <section className={classes.options}>
      <header className={classes.header}>
        <h2 className={classes.title}>Payment Options</h2>
      </header>
      <article className={classes.article}>
        <Button
          color="primary"
          variant="solid"
          className={classes.paypal}
          onClick={payPalPayment}
        >
          Pay with PayPal
        </Button>
        <Button
          color="yellow"
          variant="solid"
          className={classes.flutter}
          onClick={flutterwavePayment}
        >
          Pay with Flutterwave
        </Button>
      </article>
    </section>
  );
};
