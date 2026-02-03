import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, OnDestroy {
  menuOpen = signal(false);
  private resizeListener?: () => void;

  constructor(protected cartService: CartService) {}

  ngOnInit(): void {
    this.resizeListener = () => this.checkViewport();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.resizeListener);
      this.checkViewport();
    }
  }

  ngOnDestroy(): void {
    if (this.resizeListener && typeof window !== 'undefined') {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private checkViewport(): void {
    if (typeof window !== 'undefined' && window.innerWidth > 768 && this.menuOpen()) {
      this.menuOpen.set(false);
    }
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
