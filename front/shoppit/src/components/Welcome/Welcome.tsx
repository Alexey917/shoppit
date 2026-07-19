import classes from './Welcome.module.css';

export const Welcome = () => {
  return (
    <section className={classes.welcome}>
      <h1 className={classes.welcome__title}>Welcome to your favorite Store</h1>
      <p className={classes.welcome__text}>
        discover the latest trends with our modern collection
      </p>
      <a href="#" className={classes.welcome__link}>
        Show Now
      </a>
    </section>
  );
};
