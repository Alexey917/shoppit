import React from 'react';
import { Spin } from 'antd';
import { OrderItem } from '../components';
import { useFetchApi } from '@/hooks';
import type { ICart, ICartItem } from '@/api/client';

import classes from './CheckoutProducts.module.css';

export const CheckoutProducts = () => {
  const cartCode = localStorage.getItem('cart_code');

  const { data, loading, error } = useFetchApi<ICart<ICartItem>>(
    `/get_cart?cart_code=${cartCode}`,
  );

  if (loading) {
    return (
      <section className={classes.detail}>
        <Spin />
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className={classes.products}>
          <span className={classes.error}>{error}</span>
        </div>
      </section>
    );
  }

  if (!data || !Array.isArray(data.items)) {
    return (
      <section>
        <header>
          <h2>Cart Summary</h2>
        </header>
        <p>Корзина пуста или данные не загружены</p>
      </section>
    );
  }

  return (
    <section className={classes.section}>
      <header className={classes.header}>
        <h2 className={classes.title}>Cart Summary</h2>
      </header>
      <div className={classes.article}>
        {data.items.map((item) => (
          <OrderItem
            key={item.id}
            product={item.product}
            quantity={item.quantity}
          />
        ))}
      </div>
      <hr className={classes.separator} />
      <footer className={classes.footer}>
        <span className={classes.text}>Total</span>
        <span className={classes.text}>{`$ ${data.sum_total}`}</span>
      </footer>
    </section>
  );
};
