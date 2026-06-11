import { useState, useEffect } from 'react';
import { client } from '../../api/client';
import { Product } from '../components';
import { getErrorMessage } from '../../api/errorHandler';

import classes from './Products.module.css';
import { Skeleton } from '@/ui';
import axios, { AxiosError } from 'axios';

export interface IProduct {
  id: number;
  image: string;
  name: string;
  price: number;
  slug: string;
}

export const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await client.get<IProduct[]>('/products');
      setProducts(response.data);
    } catch (e: unknown) {
      const errorMessage = getErrorMessage(e);
      console.log(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

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
