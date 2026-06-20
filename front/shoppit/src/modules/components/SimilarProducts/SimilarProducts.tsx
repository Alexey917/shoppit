import type { IProduct } from '../../../api/client';
import { Link } from 'react-router-dom';

import classes from './SimilarProducts.module.css';
import { memo } from 'react';

interface ISimilarProducts {
  similar: IProduct[];
}

export const SimilarProducts = memo(({ similar }: ISimilarProducts) => {
  return (
    <section className={classes.section}>
      <h3 className={classes.title}>Похожие товары</h3>
      <div className={classes.similarProducts}>
        {similar.map((similarProduct) => (
          <Link
            to={`/products/${similarProduct.slug}`}
            key={similarProduct.id}
            className={classes.link}
          >
            <article className={classes.card}>
              <img
                src={similarProduct.image}
                alt={similarProduct.name}
                className={classes.img}
              />
              <h3 className={classes.name}>{similarProduct.name}</h3>
              <p className={classes.price}>{similarProduct.price}₽</p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
});
