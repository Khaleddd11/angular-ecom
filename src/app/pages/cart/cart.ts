import { Component, OnInit, OnDestroy } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [UpperCasePipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  cartCount = 0;
  private cartSubscription?: Subscription;

  constructor(protected cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCartItems().subscribe(
      (items) => {
        this.cartItems = items;
        this.cartCount = this.cartService.getCartCount();
      }
    );
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
