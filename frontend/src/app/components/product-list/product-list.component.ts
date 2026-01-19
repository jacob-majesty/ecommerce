import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {catchError, EMPTY} from "rxjs";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import {CartItem} from "../../common/cart-item";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbPaginationModule],
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = signal<Product[]>([]);
  searchMode = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  pageNumber = signal<number>(1);
  pageSize = signal<number>(5);
  totalElements = signal<number>(0);

  private previousCategoryId = 1;
  private previousKeyword: string = "";

  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts(): void {
    this.searchMode.set(this.route.snapshot.paramMap.has('keyword'));

    if (this.searchMode()) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword') ?? '';

    if (this.previousKeyword !== theKeyword) {
      this.pageNumber.set(1);
    }

    this.previousKeyword = theKeyword;

    this.productService.searchProductsPaginate(
      this.pageNumber() - 1,
      this.pageSize(),
      theKeyword
    ).pipe(
      catchError(err => this.handleLocalError(err))
    ).subscribe(data => this.processResult(data));
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    const currentCategoryId = hasCategoryId ? +this.route.snapshot.paramMap.get('id')! : 1;

    if (this.previousCategoryId !== currentCategoryId) {
      this.pageNumber.set(1);
    }

    this.previousCategoryId = currentCategoryId;

    // Fetch paginated products by category
    this.productService.getProductListPaginate(
      this.pageNumber() - 1,
      this.pageSize(),
      currentCategoryId
    ).pipe(
      catchError(err => this.handleLocalError(err))
    ).subscribe(data => this.processResult(data));
  }

  updatePageSize(pageSize: number): void {
    this.pageSize.set(pageSize);
    this.pageNumber.set(1);
    this.listProducts();
  }

  private processResult(data: any): void {
    this.products.set(data._embedded?.products ?? []);
    this.pageNumber.set(data.page.number + 1);
    this.pageSize.set(data.page.size);
    this.totalElements.set(data.page.totalElements);
  }

  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }

  private handleLocalError(error: any) {
    console.error('Product List Error:', error);
    this.errorMessage.set('Could not load products. Please try again later.');
    return EMPTY;
  }
}
