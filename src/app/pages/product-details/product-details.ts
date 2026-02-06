import { Component, OnInit, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/products.service';

const SIZES = [
  { id: 's', label: 'S', available: true },
  { id: 'm', label: 'M', available: true },
  { id: 'l', label: 'L', available: true },
  { id: 'xl', label: 'XL', available: false },
] as const;

@Component({
  selector: 'app-product-details',
  imports: [UpperCasePipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  product = signal<Product | null>(null);
  selectedSize = signal<string>('s');
  protected readonly sizes = SIZES;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const idNum = Number(id);
    this.productsService.getProductById(idNum).subscribe(
      (data) => {
        this.product.set(data);
      },
      (error) => {
        console.log('error: ', error);
        this.product.set(null);
      },
      () => {
        console.log('complete');
      }
    );
  }

  selectSize(sizeId: string): void {
    const size = this.sizes.find((s) => s.id === sizeId);
    if (size?.available) {
      this.selectedSize.set(sizeId);
    }
  }

  addToCart(): void {
    const p = this.product();
    if (p && p.stock > 0) {
      this.cartService.addToCart(p);
    }
  }
}
