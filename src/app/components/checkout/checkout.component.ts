import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  billingAddressStates: [];
  shippingAddressStates: [];
  
  totalPrice: number = 0;
  totalQuantity: number = 0;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode:['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode:['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth:[''],
        expirationYear: ['']
      })
    });
  }

  onSubmit(){
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log("The email address is: " + this.checkoutFormGroup.get('customer')!.value.email);

  }

copyShippingAddressToBillingAddress(event){

  // takes the values in shipping address and copies it over to billing address whenever the box is checked
  if(event.target.checked){
    this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

    this.billingAddressStates = this.shippingAddressStates;
  }
  else{
      this.checkoutFormGroup.controls['billingAddress'].reset();

      this.billingAddressStates = [];
  }
}

}
