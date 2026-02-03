import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _count = signal(0);
  count = this._count.asReadonly();

  addToCart(): void {
    this._count.update((current) => current + 1);
  }

  getCartCount(): number {
    return this._count();
  }
}
