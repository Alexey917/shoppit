import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { ShoppitContext } from '@/components/Layout/Layout';

import classes from './Navbar.module.css';

import { useContext } from 'react';

export const Navbar = () => {
  const location = useLocation();
  const context = useContext(ShoppitContext);
  const currentPathHandler = (to: string) =>
    location.pathname === to ? true : false;

  const logout = () => {
    localStorage.removeItem('access');
    context?.setIsAuth(false);
  };

  return (
    <ul className={classes.navigation_list}>
      {!context?.isAuth ? (
        <>
          <li>
            <Link
              to="/login"
              className={
                !currentPathHandler('/login')
                  ? `${classes.navlink}`
                  : `${classes.navlink} ${classes.active__link}`
              }
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className={
                !currentPathHandler('/register')
                  ? `${classes.navlink}`
                  : `${classes.navlink} ${classes.active__link}`
              }
            >
              Register
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              to="/profile"
              className={
                !currentPathHandler('/profile')
                  ? `${classes.navlink}`
                  : `${classes.navlink} ${classes.active__link}`
              }
            >
              {`Hi ${context.username}`}
            </Link>
          </li>
          <li onClick={logout}>
            <Link to="/" className={classes.navlink}>
              Logout
            </Link>
          </li>
        </>
      )}

      <li className={classes.basket}>
        <Link
          to="cart"
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
        {context?.quantity != null && context?.quantity > 0 && (
          <span className={classes.quantity}>{context?.quantity}</span>
        )}
      </li>
    </ul>
  );
};
