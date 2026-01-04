import {inject, Injectable} from '@angular/core';
import {Product} from "../common/product";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProductCategory} from "../common/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = '/api/products';
  private categoryUrl = '/api/product-category';

  private httpClient = inject(HttpClient);

  getProductList(theCategoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

// Data interfaces to handle Spring Data REST response structure

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}

