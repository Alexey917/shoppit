import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

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
  items: ICartItem[];
  modified_at: string;
  num_of_items: number;
  sum_total: number;
}

export const client = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');

    if (token) {
      try {
        const decoded = jwtDecode<{ exp: number }>(token);
        const expiryDate = decoded.exp;
        const currentTime = Date.now() / 1000;

        if (expiryDate > currentTime) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          console.warn('Token expired');
          localStorage.removeItem('access');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('access');
      }
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);
