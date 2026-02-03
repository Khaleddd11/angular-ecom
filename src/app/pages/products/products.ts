import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../components/product-card/product-card';
import { products } from '../../data/products.data';

@Component({
  selector: 'app-products',
  imports: [RouterLink, ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  protected readonly products = products;
}
