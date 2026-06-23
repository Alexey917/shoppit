import axios from 'axios';

export interface IProduct {
  id: number;
  image: string;
  name: string;
  price: number;
  slug: string;
  description: string;
  category: string;
  similar_products: IProduct[];
}

export interface ICartItem {
  id: number;
  total: number;
  product: IProduct;
  quantity: number;
}

export interface ICart<ICartItem> {
  cart_code: string;
  create_at: string;
  id: number;
  items: ICartItem;
  modified_at: string;
  num_of_items: number;
  sum_total: number;
}

export const client = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});
