import React, { type FC, type ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { client } from '@/api/client';
import { Spin } from 'antd';
import { Navigate, useLocation } from 'react-router-dom';
interface IProtected {
  children: ReactNode;
}

export const ProtectedRouter: FC<IProtected> = ({ children }) => {
  const [isAuth, setAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      await auth();
      setLoading(false);
    };
    checkAuth();
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh');

    try {
      const response = await client.post('/token/refresh/', {
        refresh: refreshToken,
      });
      if (response.status === 200) {
        localStorage.setItem('access', response.data.access);
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (error) {
      console.log(error);
      setAuth(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem('access');

    if (!token) {
      setAuth(false);
      return;
    }

    try {
      const decoded = jwtDecode<{ exp: number }>(token);
      const expiryDate = decoded.exp;
      const currentTime = Date.now() / 1000;

      if (expiryDate > currentTime) {
        // Токен валидный
        setAuth(true);
      } else {
        // Токен истек - пытаемся обновить
        await refreshToken();
      }
    } catch (error) {
      console.error('Auth error:', error);
      setAuth(false);
    }
  };

  if (loading) {
    return <Spin />;
  }

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <div>{children}</div>;
};
