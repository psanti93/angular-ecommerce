import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product(); //one solution is to instantiate the product

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    //get id param string and convert string to a number using the "+" symbol
    const theProductId: number = +this.route.snapshot.paramMap.get("id")!;

    this.productService.getProduct(theProductId).subscribe(
      data => {
        //property is not assigned a value until data arrives from the ProductService method call. async call
        //This is known as a race condition. The HTML template file is attempting to access pronewProperty
        // product.imageUrl but the product is  not assigned yet hence the error: TypeError: Cannot read properties of undefined
        this.product = data;
      }
    )
  }
  addToCart(){
    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }

}
