import { client, type ICartItem, type IProduct } from '@/api/client';
import { getErrorMessage } from '@/api/errorHandler';
import React, { useState, useContext } from 'react';
import { Button, Input } from 'antd';
import { QuantityContext } from '@/components/Layout/Layout';

import classes from './CartItem.module.css';

interface IShoppingCart {
  setCartTotal: (total: number) => void;
  item: ICartItem;
}

export const CartItem = ({ setCartTotal, item }: IShoppingCart) => {
  const [value, setValue] = useState<number>(item.quantity);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const quantity = useContext(QuantityContext);

  const quantityData = { item_id: item.id, quantity: value };

  const updateQuantity = async () => {
    try {
      setLoading(true);
      await client.patch(
        `update_quantity/?item_id=${quantityData.item_id}&quantity=${quantityData.quantity}`,
      );

      const cartCode = localStorage.getItem('cart_code');
      const cartResponse = await client.get(`/get_cart?cart_code=${cartCode}`);
      setCartTotal(cartResponse.data.sum_total);
      console.log(cartResponse.data);
      quantity?.setQuantity(cartResponse.data.num_of_items);
    } catch (e: unknown) {
      const errorMessage = getErrorMessage(e);
      console.log(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className={classes.cartItem}>
      <img
        src={item.product.image}
        alt={item.product.name}
        className={classes.img}
      />
      <div className={classes.infoGroup}>
        <h3 className={classes.title}>{item.product.name}</h3>
        <p className={classes.price}>{item.product.price}</p>
      </div>
      <Input
        placeholder="Outlined"
        type="number"
        min="1"
        defaultValue={item.quantity}
        className={classes.input}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      {/* <input type="number" placeholder="1" className={classes.input} /> */}
      <Button color="purple" variant="solid" onClick={updateQuantity}>
        Обновить
      </Button>
      <Button color="danger" variant="solid">
        Удалить
      </Button>
    </article>
  );
};
