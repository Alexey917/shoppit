import { Link } from 'react-router-dom';
import {
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from '@ant-design/icons';

import classes from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <ul className={classes.footer__list}>
          <li>
            <Link to="/" className={classes.footer__link}>
              Home
            </Link>
          </li>
          <li>
            <Link to="about" className={classes.footer__link}>
              About
            </Link>
          </li>
          <li>
            <Link to="shop" className={classes.footer__link}>
              Shop
            </Link>
          </li>
          <li>
            <Link to="contact" className={classes.footer__link}>
              Contact
            </Link>
          </li>
        </ul>

        <ul className={classes.footer__list}>
          <li>
            <Link to="#" className={classes.footer__social}>
              <TwitterOutlined />
            </Link>
          </li>
          <li>
            <Link to="#" className={classes.footer__social}>
              <FacebookOutlined />
            </Link>
          </li>
          <li>
            <Link to="#" className={classes.footer__social}>
              <InstagramOutlined />
            </Link>
          </li>
        </ul>

        <p className={classes.footer__copyright}>© 2024 Shoppit</p>
      </div>
    </footer>
  );
};
