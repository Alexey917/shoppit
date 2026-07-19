import React from 'react';
import { UserInfo, Overview, OrderHistory } from '../components';

import classes from './Profile.module.css';
import { useFetchApi } from '@/hooks';

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
}

export const Profile = () => {
  const { data: user, loading, error } = useFetchApi<IUser>('user_info');

  return (
    <section className={classes.section}>
      {user && <UserInfo user={user} />}
      {user && <Overview user={user} />}
      <OrderHistory />
    </section>
  );
};
