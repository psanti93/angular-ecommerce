import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl='http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) { }

// returns an observable of type Product array and maps JSON data from Spring Data Rest to product Array
//utilizes the GetResponse interface which "unwraps" the JSON data that you get from the product Array
  getProductList(theCategoryId: number): Observable<Product[]>{

    // build url based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      // _embedded is the top level object with products as the array
      map(response => response._embedded.products)
    );
  }
}

// unwraps the JSOn from Spring Data Rest _embedded entry
interface GetResponse{
  _embedded: {
    products: Product [];
  }
 }
