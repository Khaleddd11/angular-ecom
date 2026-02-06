import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../components/product-card/product-card';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  imports: [RouterLink, ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  protected products = signal<Product[]>([]);

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(
      (data) => {
        this.products.set(data.products);
      },
      (error) => {
        console.log('error: ', error);
      },
      () => {
        console.log('complete');
      }
    );
  }
}
