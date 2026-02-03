import { Routes } from '@angular/router';
import { Products } from './pages/products/products';
import { ProductDetails } from './pages/product-details/product-details';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Contact } from './pages/contact/contact';
import { Cart } from './pages/cart/cart';
import { PageNotFound } from './pages/page-not-found/page-not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: Products, title: 'Products' },
  { path: 'product/:id', component: ProductDetails, title: 'Product Details' },
  { path: 'login', component: Login, title: 'Login' },
  { path: 'register', component: Register, title: 'Register' },
  { path: 'contact', component: Contact, title: 'Contact' },
  { path: 'cart', component: Cart, title: 'Cart' },
  { path: '**', component: PageNotFound, title: 'Not Found' },
];
