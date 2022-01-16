import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { GetResponseProducts, ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  //new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

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

    //check if we have a dfferent category than previous
    //note: angular will reuse a componet if it is curently being viewed

    //if we have a different category id than previouse
    //then set thePageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId = ${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);


    // now get the products for the given category id doing -1 on number since when we call to the backend it's zero based
    // we currently have the page number set to 1
    this.productService.getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId).subscribe(this.processResult());

  }
  processResult(){
    return (data: GetResponseProducts) =>{
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;

    }
  }
  // maps to the the drop down to map to page size
  updatePageSize(pageSize: number){
    this.thePageSize = pageSize;
    this.thePageNumber=1;
    this.listProducts();
  }

}
