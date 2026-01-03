import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  // templateUrl: './product-list.component.html',
  //templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.listProducts();
    console.log('All products loaded:', this.products);
  }

  listProducts(): void {
    this.productService.getProductList().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }
}
