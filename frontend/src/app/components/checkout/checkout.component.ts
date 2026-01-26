import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {CartService} from "../../services/cart.service";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {ShopFormService} from "../../services/shop-form.service";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
    NgForOf
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  constructor(private formBuilder: FormBuilder,
              private shopFormService: ShopFormService,
              private cartService: CartService) { }

  ngOnInit(): void {

    this.reviewCartStatus();

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
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    // Populate initial credit card months
    const startMonth: number = new Date().getMonth() + 1;
    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    );

    // Populate credit card years
    this.shopFormService.getCreditCardYears().subscribe(
      data => this.creditCardYears = data
    );
  }

  reviewCartStatus() {
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    
    if (!creditCardFormGroup) {
      console.warn('Credit card form group is not available');
      return;
    }
    
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value?.expirationYear || currentYear);

    let startMonth: number = (currentYear === selectedYear) ? new Date().getMonth() + 1 : 1;

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    );
  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  onSubmit() {
    console.log("Handling the submit button");
    const customerFormGroup = this.checkoutFormGroup.get('customer');

    if (customerFormGroup) {
      console.log(customerFormGroup.value);
      console.log("The email address is " + customerFormGroup.value.email);
    } else {
      console.error("Customer form group is not defined");
    }
  }
}
