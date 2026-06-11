import { Link } from 'react-router-dom';
import classes from './NotFoundPage.module.css';

export const NotFoundPage = () => {
  return (
    <main>
      <section className={classes.welcome}>
        <h1 className={classes.welcome__title}>Page Not Found!</h1>
        <p className={classes.welcome__text}>
          The page you tried accessing does not exist
        </p>
        <Link to="/" className={classes.welcome__link}>
          Go Back
        </Link>
      </section>
    </main>
  );
};
