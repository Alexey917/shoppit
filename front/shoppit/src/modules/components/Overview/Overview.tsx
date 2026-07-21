import React from 'react';

import classes from './Overview.module.css';
import type { IUser } from '@/modules/Profile/Profile';

interface IOverview {
  user: IUser;
}

export const Overview = ({ user }: IOverview) => {
  return (
    <article className={classes.overview}>
      <h2 className={classes.title}>Account Overview</h2>
      <ul className={classes.overviewList}>
        <li className={classes.overviewItem}>
          <span className={classes.key}>Full Name: </span>
          <span className={classes.value}>
            {user.first_name} {user.last_name}
          </span>
        </li>
        <li className={classes.overviewItem}>
          <span className={classes.key}>Email:</span>
          <span className={classes.value}>{user.email}</span>
        </li>
        <li className={classes.overviewItem}>
          <span className={classes.key}>Phone:</span>
          <span className={classes.value}>{user.phone}</span>
        </li>
        <li className={classes.overviewItem}>
          <span className={classes.key}>City:</span>
          <span className={classes.value}>{user.city}</span>
        </li>
        <li className={classes.overviewItem}>
          <span className={classes.key}>Country:</span>
          <span className={classes.value}>{user.state}</span>
        </li>
        <li className={classes.overviewItem}>
          <span className={classes.key}>Member Since:</span>
          <span className={classes.value}>January 2023</span>
        </li>
      </ul>
    </article>
  );
};
