import { useFetchApi } from '@/hooks';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { CartItem } from '../components/CartItem';
import classes from './ShoppingCart.module.css';
import type { ICartItem, ICart } from '@/api/client';
import { client } from '@/api/client';
import { getErrorMessage } from '@/api';

interface IShoppingCart {
  setCartTotal: (total: number) => void;
}

export const ShoppingCart = ({ setCartTotal }: IShoppingCart) => {
  const [data, setData] = useState<ICart<ICartItem> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const cartCode = localStorage.getItem('cart_code');

  // const { data, loading, error } = useFetchApi<ICart<ICartItem>>(
  //   `/get_cart?cart_code=${cartCode}`,
  // );

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const response = await client.get<ICart<ICartItem>>(
          `/get_cart?cart_code=${cartCode}`,
        );
        console.log(response.data);
        setData(response.data);
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
          <CartItem
            key={item.id}
            item={item}
            setCartTotal={setCartTotal}
            setData={setData}
          />
        ))}
      </div>
    </section>
  );
};
