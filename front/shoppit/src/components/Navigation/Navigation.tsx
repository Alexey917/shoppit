import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

import classes from './Navigation.module.css';

export const Navigation = () => {
  const location = useLocation();

  const currentPathHandler = (to: string) =>
    location.pathname === to ? true : false;

  return (
    <ul className={classes.navigation_list}>
      <li>
        <Link
          to="/"
          className={
            !currentPathHandler('/')
              ? `${classes.navlink}`
              : `${classes.navlink} ${classes.active__link}`
          }
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="shop"
          className={
            !currentPathHandler('shop')
              ? `${classes.navlink}`
              : `${classes.navlink} ${classes.active__link}`
          }
        >
          Shop
        </Link>
      </li>
      <li>
        <Link
          to="about"
          className={
            !currentPathHandler('about')
              ? `${classes.navlink}`
              : `${classes.navlink} ${classes.active__link}`
          }
        >
          About
        </Link>
      </li>
      <li>
        <Link
          to="contact"
          className={
            !currentPathHandler('contact')
              ? `${classes.navlink}`
              : `${classes.navlink} ${classes.active__link}`
          }
        >
          Contact
        </Link>
      </li>
      <li className={classes.basket}>
        <Link
          to="basket"
          className={
            !currentPathHandler('basket')
              ? `${classes.navlink}`
              : `${classes.navlink} ${classes.active__link}`
          }
        >
          <ShoppingCartOutlined
            style={{
              fontSize: '20px',
              color: '#fff',
              backgroundColor: '#000',
              padding: '15px',
              borderRadius: '25px',
              width: '26px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </Link>
        <span className={classes.quantity}>0</span>
      </li>
    </ul>
  );
};
