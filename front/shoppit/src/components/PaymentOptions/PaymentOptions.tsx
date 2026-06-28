import React from 'react';
import { Button } from 'antd';

import classes from './Payment.module.css';

export const PaymentOptions = () => {
  return (
    <section className={classes.options}>
      <header className={classes.header}>
        <h2 className={classes.title}>Payment Options</h2>
      </header>
      <article className={classes.article}>
        <Button color="primary" variant="solid" className={classes.paypal}>
          Pay with PayPal
        </Button>
        <Button color="yellow" variant="solid" className={classes.flutter}>
          Pay with Flutterwave
        </Button>
      </article>
    </section>
  );
};
