import { useFetchApi } from '@/hooks';
import React from 'react';
import { Spin } from 'antd';
import { CartItem } from '../components/CartItem';
import classes from './ShoppingCart.module.css';
import type { ICart, ICartItem } from '@/api/client';

interface IShoppingCart {
  setCartTotal: (total: number) => void;
}

export const ShoppingCart = ({ setCartTotal }: IShoppingCart) => {
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
        <h2>Shopping Cart</h2>
        <p>Корзина пуста или данные не загружены</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className={classes.title}>Shopping Cart</h2>
      <div>
        {data.items.map((item: ICartItem) => (
          <CartItem key={item.id} item={item} setCartTotal={setCartTotal} />
        ))}
      </div>
    </section>
  );
};
