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
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="about">About</Link>
        </li>
        <li>
          <Link to="shop">Shop</Link>
        </li>
        <li>
          <Link to="contact">Contact</Link>
        </li>
      </ul>

      <ul>
        <li>
          <Link to="#">
            <TwitterOutlined />
          </Link>
        </li>
        <li>
          <Link to="#">
            <FacebookOutlined />
          </Link>
        </li>
        <li>
          <Link to="#">
            <InstagramOutlined />
          </Link>
        </li>
      </ul>
    </footer>
  );
};
