import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@/components';

import classes from './Layout.module.css';
import { generateCartCode } from '@/utils';
import { client } from '@/api/client';
import { getErrorMessage } from '@/api';

export const Layout = () => {
  const [quantity, setQuantity] = useState<number>(0);
  const cardCode = localStorage.getItem('cart_code');

  useEffect(() => {
    const getQuantity = async () => {
      try {
        const response = await client.get(
          `/get_cart_stat?cart_code=${cardCode}`,
        );
        setQuantity(response.data.num_of_items);
      } catch (e: unknown) {
        const errorMessage = getErrorMessage(e);
        console.log(errorMessage);
      }
    };

    getQuantity();
  }, [cardCode]);

  useEffect(() => {
    if (!localStorage.getItem('cart_code')) {
      localStorage.setItem('cart_code', generateCartCode());
    }
  }, []);

  return (
    <div className={classes.layout}>
      <Header quantity={quantity} />
      <Outlet />
      <Footer />
    </div>
  );
};
