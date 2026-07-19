import {
  client,
  type ICart,
  type ICartItem,
  type IProduct,
} from '@/api/client';
import { getErrorMessage } from '@/api/errorHandler';
import { useState, useContext } from 'react';
import { Button, Input } from 'antd';
import { ShoppitContext } from '@/components/Layout/Layout';
import { toast } from 'react-toastify';

import classes from './CartItem.module.css';

interface IShoppingCart {
  setCartTotal: (total: number) => void;
  item: ICartItem;
  setData: (data: ICart<ICartItem>) => void;
}

export const CartItem = ({ setCartTotal, item, setData }: IShoppingCart) => {
  const [value, setValue] = useState<number>(item.quantity);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const quantity = useContext(ShoppitContext);

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
      toast.success('Количество товаров обновлено!');
    } catch (e: unknown) {
      const errorMessage = getErrorMessage(e);
      console.log(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteCartItem = async () => {
    const confirmDelete = window.confirm('Вы точно хотите удалить товар?');

    if (confirmDelete) {
      try {
        setLoading(true);
        await client.post(`/delete_cart_item/?item_id=${quantityData.item_id}`);
        const cartCode = localStorage.getItem('cart_code');
        const cartResponse = await client.get(
          `/get_cart?cart_code=${cartCode}`,
        );
        setData(cartResponse.data);
        setCartTotal(cartResponse.data.sum_total);
        quantity?.setQuantity(cartResponse.data.num_of_items);
        toast.success('Товар удален из корзины!');
      } catch (e: unknown) {
        const errorMessage = getErrorMessage(e);
        console.log(errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
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
      <Button color="danger" variant="solid" onClick={deleteCartItem}>
        Удалить
      </Button>
    </article>
  );
};
