import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  // Subject is a subclass of observable. We can use it to publishe events in our code.
  // the event will be sent out to all of the subscribers
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }


  addToCart(theCartItem: CartItem){
    // check if we already have the item in our cartItems
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if(this.cartItems.length >0){

      // find the item in the cart based on the item // IDEA:
      for(let tempCartItem of this.cartItems){
        if(tempCartItem.id === theCartItem.id )
        existingCartItem = tempCartItem;
        break;
      }

      // check if we found the the item
      alreadyExistsInCart = (existingCartItem != undefined);

    }

    // if the cart item exists increment the quantity
    if (alreadyExistsInCart){
      existingCartItem.quantity++;
    }
    else{
      this.cartItems.push(theCartItem);
    }

    // compute cart total price and total totalQuantity
    this.computCartTotals();


  }
  computCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    //  publish the new values ..all subscribers will receive the new data

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data just for debugging purposes

    this.logCartData(totalPriceValue, totalQuantityValue);
  }
  logCartData(totalPriceValue: number, totalQuanityValue: any) {
    for (let tempCartItem of this.cartItems){
      const subtotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subtotalPrice= ${subtotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuanityValue}`);
  }


}
