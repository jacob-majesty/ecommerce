import {Component, OnInit, OnDestroy, inject, signal} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ProductService } from "../../services/product.service";
import { Product } from '../../common/product';
import { catchError, EMPTY } from 'rxjs';
import {CurrencyPipe} from "@angular/common";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/cart-item";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe
  ],
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  //product!: Product;
  product = signal<Product | null>(null);
  errorMessage = signal<string | null>(null);

  private productService = inject(ProductService);
  private cartService= inject(CartService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    // Reactive approach: Listen to param changes
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.handleProductDetails(+id);
      } else {
        this.router.navigate(['/products']);
      }
    });
  }

  addToCart() {
    if (this.product()) {
      console.log(`Adding to cart: ${this.product()?.name}, ${this.product()?.unitPrice}`);

      const theCartItem = new CartItem(this.product()!);

      this.cartService.addToCart(theCartItem);
    }
  }

  private handleProductDetails(theProductId: number): void {
    this.productService.getProduct(theProductId).pipe(
      catchError(error => {
        console.error('Error fetching product:', error);
        this.errorMessage.set('Failed to load product details.');
        return EMPTY;
      })
    )
    .subscribe({
      next: (product: Product) => {
        this.product.set(product);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load product details.');
        console.error('Error loading product:', error);
      }
    });
  }
}
