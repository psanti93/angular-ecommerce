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
  private categoryUrl = "http://localhost:8080/api/product-category";

  constructor(private httpClient: HttpClient) { }

// returns an observable of type Product array and maps JSON data from Spring Data Rest to product Array
//utilizes the GetResponse interface which "unwraps" the JSON data that you get from the product Array
  getProductList(theCategoryId: number): Observable<Product[]>{

    // build url based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductListPaginate(thePage: number,
                         thePageSize: number, theCategoryId: number): Observable<GetResponseProducts>{

    // build url based on category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}` + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    // build url based on theKeyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);

  }

  getProduct(theProductId: number): Observable<Product> {
    //need to build url based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`
    return this.httpClient.get<Product>(productUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }



  private getProducts(searchUrl: string): Observable<Product[]>{

    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      // _embedded is the top level object with products as the array
      map(response => response._embedded.products)
    );
  }


}

// unwraps the JSOn from Spring Data Rest _embedded entry for products
interface GetResponseProducts{
  _embedded: {
    products: Product [];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
 }

 // unwraps the JSOn from Spring Data Rest _embedded entry for product categories
 interface GetResponseProductCategory{
   _embedded: {
     productCategory: ProductCategory [];
   }
  }
