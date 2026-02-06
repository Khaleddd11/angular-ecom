import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$;
  }

  getCartCount(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.quantity, 0);
  }

  addToCart(product: Product): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find((item) => item.product.id === product.id);

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity += 1;
        this.cartItemsSubject.next([...currentItems]);
      }
    } else {
      if (product.stock > 0) {
        const newItem: CartItem = { product, quantity: 1 };
        this.cartItemsSubject.next([...currentItems, newItem]);
      }
    }
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter((item) => item.product.id !== productId);
    this.cartItemsSubject.next(updatedItems);
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItemsSubject.value;
    const item = currentItems.find((item) => item.product.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else if (quantity <= item.product.stock) {
        item.quantity = quantity;
        this.cartItemsSubject.next([...currentItems]);
      }
    }
  }

  increaseQuantity(productId: number): void {
    const currentItems = this.cartItemsSubject.value;
    const item = currentItems.find((item) => item.product.id === productId);
    
    if (item && item.quantity < item.product.stock) {
      item.quantity += 1;
      this.cartItemsSubject.next([...currentItems]);
    }
  }

  decreaseQuantity(productId: number): void {
    const currentItems = this.cartItemsSubject.value;
    const item = currentItems.find((item) => item.product.id === productId);
    
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        this.cartItemsSubject.next([...currentItems]);
      } else {
        this.removeFromCart(productId);
      }
    }
  }
}
