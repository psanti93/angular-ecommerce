import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl='http://localhost:8080/api/products';
  private categoryUrl = "http://localhost:8080/api/products/product-category";

  constructor(private httpClient: HttpClient) { }

// returns an observable of type Product array and maps JSON data from Spring Data Rest to product Array
//utilizes the GetResponse interface which "unwraps" the JSON data that you get from the product Array
  getProductList(theCategoryId: number): Observable<Product[]>{

    // build url based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      // _embedded is the top level object with products as the array
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
}

// unwraps the JSOn from Spring Data Rest _embedded entry for products
interface GetResponseProducts{
  _embedded: {
    products: Product [];
  }
 }

 // unwraps the JSOn from Spring Data Rest _embedded entry for product categories
 interface GetResponseProductCategory{
   _embedded: {
     productCategory: ProductCategory [];
   }
  }
