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

export const client = axios.create({
  baseURL: 'http://127.0.0.1:8000',
});
