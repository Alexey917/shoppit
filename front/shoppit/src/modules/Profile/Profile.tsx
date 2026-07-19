import React from 'react';
import { UserInfo, Overview, OrderHistory } from '../components';

import classes from './Profile.module.css';
import { useFetchApi } from '@/hooks';
import type { IProduct } from '@/api/client';

export interface IUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
  email: string;
  state: string;
  address: string;
  items: [
    {
      id: number;
      product: IProduct;
      quantity: number;
      order_id: string;
      order_date: string;
    },
  ];
}

export const Profile = () => {
  const { data: user, loading, error } = useFetchApi<IUser>('user_info');

  console.log(user);

  return (
    <section className={classes.section}>
      {user && <UserInfo user={user} />}
      {user && <Overview user={user} />}
      {user && <OrderHistory user={user} />}
    </section>
  );
};
