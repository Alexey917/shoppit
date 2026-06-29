import {
  HomePage,
  NotFoundPage,
  DetailPage,
  CartPage,
  CheckoutPage,
  LoginPage,
} from '@/pages';
import { Layout, ProtectedRouter } from '@/components';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/products/:slug',
        element: <DetailPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/checkout',
        element: (
          <ProtectedRouter>
            <CheckoutPage />
          </ProtectedRouter>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
