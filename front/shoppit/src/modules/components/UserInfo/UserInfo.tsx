import { Button } from 'antd';
import pic from '../../../assets/react.svg';
import type { IUser } from '@/modules/Profile/Profile';
import React from 'react';

import classes from './UserInfo.module.css';

interface IUserInfo {
  user: IUser;
}

export const UserInfo = ({ user }: IUserInfo) => {
  return (
    <article className={classes.user}>
      <img src={pic} alt="user" className={classes.img} />
      <p className={classes.userName}>{user.username}</p>
      <p className={classes.userEmail}>{user.email}</p>
      <Button variant="solid" className={classes.btn}>
        Edit Profile
      </Button>
    </article>
  );
};
