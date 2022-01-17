import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }
  updateCartStatus() {
    // when new events are received make assignments to update UI

    // subscribe to the cart totalPriceValue

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice= data
    );

    // subscribe to teh cart totalQuantit
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity= data
    );

  }

}
