import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@/components';

import classes from './Layout.module.css';

export const Layout = () => {
  return (
    <div className={classes.layout}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
