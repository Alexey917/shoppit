import type { IProduct } from '../../api/client';
import { Product } from '../components';
import { Skeleton } from '@/ui';

import classes from './Products.module.css';
import { useFetchApi } from '@/hooks';

export const Products = () => {
  const {
    data: products,
    error,
    loading,
  } = useFetchApi<IProduct[]>('/products');

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return (
      <section>
        <h2 className={classes.title}>Our Products</h2>
        <div className={classes.products}>
          <span className={classes.error}>{error}</span>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className={classes.title}>Our Products</h2>
      <div className={classes.products}>
        {products &&
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
};
