import { Product } from '../models/product';

export const products: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    description: 'Description for product 1.',
    price: 20,
    images: ['https://picsum.photos/seed/p1/400/300'],
    rating: 4.5,
    stock: 10,
    category: 'Category A',
    brand: 'Brand X',
    discountPercentage: 10,
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'Description for product 2.',
    price: 20,
    images: ['https://picsum.photos/seed/p2/400/300'],
    rating: 3.8,
    stock: 0,
    category: 'Category B',
    brand: 'Brand Y',
  },
  {
    id: 3,
    title: 'Product 3',
    description: 'Description for product 3.',
    price: 20,
    images: ['https://picsum.photos/seed/p3/400/300'],
    rating: 5,
    stock: 5,
    category: 'Category A',
    brand: 'Brand Z',
    discountPercentage: 15,
  },
];
