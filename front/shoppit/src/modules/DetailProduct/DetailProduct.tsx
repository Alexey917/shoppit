import { useParams } from 'react-router-dom';
import { client, type IProduct } from '../../api/client';
import { getErrorMessage } from '@/api';
import { Spin } from 'antd';
import { useFetchApi, usePostApi } from '@/hooks';
import { SimilarProducts } from '../components';

import classes from './DetailProduct.module.css';
import { useEffect, useState, useContext } from 'react';
import { QuantityContext } from '@/components/Layout/Layout';

export const DetailProduct = () => {
  const [inCart, setInCart] = useState<boolean>(false);
  const { slug } = useParams<string>();
  const cartCode = localStorage.getItem('cart_code');
  const quantity = useContext(QuantityContext);

  const {
    data: product,
    error,
    loading,
  } = useFetchApi<IProduct>(`/product_detail/${slug}`);

  useEffect(() => {
    if (!cartCode || !product?.id) return;

    const checkProductInCart = async () => {
      try {
        const response = await client.get(
          `/product_in_cart?cart_code=${cartCode}&product_id=${product.id}`,
        );

        console.log(response.data);
        setInCart(response.data.product_exists_in_cart);
      } catch (e: unknown) {
        const errorMessage = getErrorMessage(e);
        console.log(errorMessage);
      }
    };

    checkProductInCart();
  }, [cartCode, product?.id]);

  const addItem = async () => {
    if (cartCode && product?.id) {
      try {
        await client.post('/add_item', {
          cart_code: cartCode,
          product_id: product?.id,
        });

        setInCart(true);
        quantity?.setQuantity((prev) => prev + 1);
      } catch (e: unknown) {
        const errorMessage = getErrorMessage(e);
        console.log(errorMessage);
      }
    }
  };

  if (loading) {
    return (
      <section className={classes.detail}>
        <Spin />
      </section>
    );
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
          <button onClick={addItem} disabled={inCart} className={classes.btn}>
            {inCart ? 'Товар уже в корзине' : 'Добавить в корзину'}
          </button>
        </section>
        <SimilarProducts similar={product.similar_products} />
      </>
    );
  }
};
