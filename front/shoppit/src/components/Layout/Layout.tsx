import { Outlet } from 'react-router-dom';
import { Header, Footer } from '@/components';

export const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
