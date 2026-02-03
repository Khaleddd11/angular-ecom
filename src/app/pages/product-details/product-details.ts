import { Component, OnInit, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { products } from '../../data/products.data';

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const idNum = Number(id);
    const found = products.find((p) => p.id === idNum);
    this.product.set(found ?? null);
  }

  selectSize(sizeId: string): void {
    const size = this.sizes.find((s) => s.id === sizeId);
    if (size?.available) {
      this.selectedSize.set(sizeId);
    }
  }
}
