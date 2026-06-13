import { useParams } from 'react-router-dom';
import type { IProduct } from '../../api/client';
import { Skeleton } from '@/ui';
import { useFetchApi } from '@/hooks';
import { SimilarProducts } from '../components';

import classes from './DetailProduct.module.css';

export const DetailProduct = () => {
  const { slug } = useParams<string>();

  const {
    data: product,
    error,
    loading,
  } = useFetchApi<IProduct>(`/product_detail/${slug}`);

  if (loading) {
    return <Skeleton />;
  }

  if (error) {
    return (
      <section>
        <div className={classes.products}>
          <span className={classes.error}>{error}</span>
        </div>
      </section>
    );
  }

  if (product) {
    return (
      <>
        <section className={classes.detail}>
          <img
            src={product.image}
            alt={product.name}
            className={classes.image}
          />
          <h2 className={classes.title}>{product.name}</h2>
          <p className={classes.price}>{product.price}</p>
          <p className={classes.description}>{product.description}</p>
          <button className={classes.btn}>Добавить в корзину</button>
        </section>
        <SimilarProducts similar={product.similar_products} />
      </>
    );
  }
};
