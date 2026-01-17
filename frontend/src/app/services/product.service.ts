import { inject, Injectable } from '@angular/core';
import { Product } from "../common/product";
import { catchError, map, Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ProductCategory } from "../common/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = '/api/products';
  private categoryUrl = '/api/product-category';

  private httpClient = inject(HttpClient);

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded?.productCategory ?? []),
      catchError(this.handleError)
    );
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl).pipe(
      catchError(this.handleError)
    );
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded?.products ?? []),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Backend Communication Error:', error);
    return throwError(() => new Error('Service unavailable. Please try again later.'));
  }
}

// Data interfaces to handle Spring Data REST response structure

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
