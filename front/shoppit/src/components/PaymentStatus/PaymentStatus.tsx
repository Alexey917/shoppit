import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import classes from './PaymentStatus.module.css';
import { client } from '@/api/client';
import { getErrorMessage } from '@/api';
import { ShoppitContext } from '../Layout/Layout';

export const PaymentStatus = () => {
  const [title, setTitle] = useState<string>('Verifying Payment!');
  const [text, setText] = useState<string>(
    'Give as a moment we are verifying your payment!',
  );
  const location = useLocation();
  const context = useContext(ShoppitContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const txRef = queryParams.get('tx_ref');
    const transactionId = queryParams.get('transaction_id');

    const verifyHandler = async () => {
      try {
        const response = await client.post(
          `payment_callback/?status=${status}&tx_ref=${txRef}&transaction_id=${transactionId}`,
        );
        setTitle(response.data.message);
        setText(response.data.subMessage);
        localStorage.removeItem('cart_code');
        context?.setQuantity(0);
      } catch (e: unknown) {
        const errorMessage = getErrorMessage(e);
        console.log(errorMessage);
      }
    };

    verifyHandler();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get('paymentId');
    const payerId = queryParams.get('PayerID');
    const ref = queryParams.get('ref');

    const verifyPaypalHandler = async () => {
      try {
        const response = await client.post(
          `paypal_payment_callback/?paymentId=${paymentId}&PayerID=${payerId}&ref=${ref}`,
        );
        setTitle(response.data.message);
        setText(response.data.subMessage);
        localStorage.removeItem('cart_code');
        context?.setQuantity(0);
      } catch (e: unknown) {
        const errorMessage = getErrorMessage(e);
        console.log(errorMessage);
      }
    };

    verifyPaypalHandler();
  }, []);

  return (
    <section className={classes.welcome}>
      <h1 className={classes.welcome__title}>{title}</h1>
      <p className={classes.welcome__text}>{text}</p>
      <div className={classes.welcome__wrapperLink}>
        <Link to="" className={classes.welcome__link}>
          View Order Details
        </Link>
        <Link to="" className={classes.welcome__link}>
          Continue Shopping
        </Link>
      </div>
    </section>
  );
};
