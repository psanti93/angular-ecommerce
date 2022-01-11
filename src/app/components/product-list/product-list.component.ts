import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  searchMode: boolean;

  // Inject the pronewPropertye for this component to use it
  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts(){
    //if in search mode look for products based on the search bar else list all the products
    //keyword is the value from the route defined for search
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if(this.searchMode){
      this.handlSearchProducts();
    }else{
      this.handleListProducts();

    }

  }
  handlSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    //search for products using theKeyword
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
}
  handleListProducts(){
    // check if id" parameter is available
    //route -> use the activated route, snapshot -> state of route at the given moment of time
    //paramMap -> map of all the route parameters .has('id') read the id parameter
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      // get the "id" param string. convert string to a number using the "+ symobl"
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }
    else{
      // not category id available.. default  category id1
      this.currentCategoryId = 1;
    }

    // now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
