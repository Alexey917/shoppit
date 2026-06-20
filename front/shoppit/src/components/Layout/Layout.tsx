import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@/components';

import classes from './Layout.module.css';
import { generateCartCode } from '@/utils';

export const Layout = () => {
  useEffect(() => {
    if (!localStorage.getItem('cart_code')) {
      localStorage.setItem('cart_code', generateCartCode());
    }
  }, []);

  return (
    <div className={classes.layout}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
