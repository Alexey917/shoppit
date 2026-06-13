import { Link } from 'react-router-dom';
import type { IProduct } from '../../../api/client';

import classes from './Product.module.css';
import { memo } from 'react';

interface IGood {
  product: IProduct;
}

export const Product = memo(({ product }: IGood) => {
  return (
    <Link to={`products/${product.slug}`} className={classes.link}>
      <article className={classes.card}>
        <img src={product.image} alt={product.name} className={classes.img} />
        <h3 className={classes.name}>{product.name}</h3>
        <p className={classes.price}>{product.price}₽</p>
      </article>
    </Link>
  );
});
