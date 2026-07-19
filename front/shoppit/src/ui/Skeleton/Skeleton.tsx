import classes from './Skeleton.module.css';

const ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

export const Skeleton = () => {
  return (
    <section>
      <h2 className={classes.title}>Our Products</h2>
      <div className={classes.products}>
        {ARR.map((elem, index) => (
          <div className={classes.card} key={index}>
            <div className={classes.img}></div>
            <div className={classes.name}></div>
            <div className={classes.price}></div>
          </div>
        ))}
      </div>
    </section>
  );
};
