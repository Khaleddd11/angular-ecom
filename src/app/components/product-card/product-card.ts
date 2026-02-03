import { Component, input } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();

  constructor(protected cartService: CartService) {}

  addToCart(): void {
    const p = this.product();
    if (p && p.stock > 0) {
      this.cartService.addToCart();
    }
  }
}
