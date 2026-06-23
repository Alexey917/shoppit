import { Link } from 'react-router-dom';
import { Navigation } from '@/components';

import classes from './Header.module.css';

export const Header = () => {
  return (
    <nav className={classes.navigation}>
      <Link to="/" className={classes.navlink}>
        <span className={classes.logo}>SHOPPIT</span>
      </Link>
      <Navigation />
    </nav>
  );
};
