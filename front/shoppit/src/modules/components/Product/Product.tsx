import { Link } from 'react-router-dom';
import type { IProduct } from '@/modules/Products/Products';

import classes from './Product.module.css';

interface IGood {
  product: IProduct;
}

export const Product = ({ product }: IGood) => {
  return (
    <Link to={product.slug} className={classes.link}>
      <article className={classes.card}>
        <img src={product.image} alt={product.name} className={classes.img} />
        <h3 className={classes.name}>{product.name}</h3>
        <p className={classes.price}>{product.price}₽</p>
      </article>
    </Link>
  );
};
