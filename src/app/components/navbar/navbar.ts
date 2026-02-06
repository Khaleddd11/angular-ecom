import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  menuOpen = signal(false);
  cartCount = signal(0);
  private cartSubscription?: Subscription;

  constructor(protected cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.getCartItems().subscribe((items) => {
      this.cartCount.set(this.cartService.getCartCount());
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe();
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
