import { useEffect, useState, createContext, useMemo } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@/components';
import { ToastContainer } from 'react-toastify';

import classes from './Layout.module.css';
import { generateCartCode } from '@/utils';
import { client } from '@/api/client';
import { getErrorMessage } from '@/api';
import { jwtDecode } from 'jwt-decode';

export const ShoppitContext = createContext<{
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
} | null>(null);

export const Layout = () => {
  const [quantity, setQuantity] = useState<number>(0);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const cardCode = localStorage.getItem('cart_code');

  const contextValue = useMemo(
    () => ({
      quantity,
      setQuantity,
      isAuth,
      setIsAuth,
      username,
      setUsername,
    }),
    [quantity, isAuth, username],
  );

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
    const checkAuth = () => {
      const token = localStorage.getItem('access');

      if (token) {
        const decoded = jwtDecode<{ exp: number }>(token);
        const expiryDate = decoded.exp;
        const currentTime = Date.now() / 1000;
        if (expiryDate > currentTime) {
          setIsAuth(true);
        }
      }
    };

    const getUsername = async () => {
      try {
        const response = await client.get('get_username');
        setUsername(response.data.username);
      } catch (e: unknown) {
        const errorMessage = getErrorMessage(e);
        console.log(errorMessage);
      }
    };

    checkAuth();
    if (isAuth) {
      getUsername();
    }
  }, [isAuth]);

  useEffect(() => {
    if (!localStorage.getItem('cart_code')) {
      localStorage.setItem('cart_code', generateCartCode());
    }
  }, []);

  return (
    <div className={classes.layout}>
      <ShoppitContext.Provider value={contextValue}>
        <Header />
        <ToastContainer />
        <Outlet />
        <Footer />
      </ShoppitContext.Provider>
    </div>
  );
};
