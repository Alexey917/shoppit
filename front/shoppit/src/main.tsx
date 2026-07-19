import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routers';

import './App.css';
import './index.css';
import { HomePage } from './pages';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <HomePage /> */}
    <RouterProvider router={router} />
  </StrictMode>,
);
