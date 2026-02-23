import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CartService} from "../../services/cart.service";
import {CurrencyPipe, CommonModule} from "@angular/common";
import {ShopFormService} from "../../services/shop-form.service";
import {Country} from "../../common/country";
import {State} from "../../common/state";
import {ShopValidators} from "../../validators/shop-validators";
import {CheckoutService} from "../../services/checkout.service";
import {Router} from "@angular/router";
import {Order} from "../../common/order";
import {OrderItem} from "../../common/order-item";
import {Purchase} from "../../common/purchase";
import {environment} from "../../../environments/environment";
import {loadStripe, Stripe} from "@stripe/stripe-js";
import {PaymentInfo} from "../../common/payment-info";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CurrencyPipe
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit, AfterViewInit {

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardMonths: number[] = [];
  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  storage: Storage = sessionStorage;

  stripePromise = loadStripe(environment.stripe.publishableKey);
  stripe: Stripe | null = null;
  paymentInfo: PaymentInfo = new PaymentInfo();
  cardElement: any;
  displayError: any = "";
  isDisabled: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private shopFormService: ShopFormService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private router: Router) { }

  get firstName() {
    return this.checkoutFormGroup?.get('customer.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup?.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup?.get('customer.email');
  }

  get shippingAddressStreet() { return this.checkoutFormGroup?.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup?.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup?.get('shippingAddress.state'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup?.get('shippingAddress.zipCode'); }
  get shippingAddressCountry() { return this.checkoutFormGroup?.get('shippingAddress.country'); }

  get billingAddressStreet() { return this.checkoutFormGroup?.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup?.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup?.get('billingAddress.state'); }
  get billingAddressZipCode() { return this.checkoutFormGroup?.get('billingAddress.zipCode'); }
  get billingAddressCountry() { return this.checkoutFormGroup?.get('billingAddress.country'); }

  ngOnInit(): void {
    this.reviewCartDetails();

    const theEmail = this.getStoredEmail();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        lastName:  new FormControl('', [Validators.required, Validators.minLength(2), ShopValidators.notOnlyWhitespace]),
        email: new FormControl(theEmail,
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2),
          ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2),
          ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2),
          ShopValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2),
          ShopValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2),
          ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2),
          ShopValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({

      })
    });

    this.shopFormService.getCountries().subscribe(
      data => this.countries = data
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.setupStripePaymentForm());
  }

  reviewCartDetails() {
      this.cartService.totalQuantity.subscribe(
        totalQuantity => this.totalQuantity = totalQuantity
      );

      this.cartService.totalPrice.subscribe(
        totalPrice => this.totalPrice = totalPrice
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
      this.billingAddressStates = this.shippingAddressStates;

    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }

  onSubmit() {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    let purchase = new Purchase();
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;

    if (purchase.shippingAddress.state) {
      const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
      purchase.shippingAddress.state = shippingState.name;
    } else {
      purchase.shippingAddress.state = '';
    }

    if (purchase.shippingAddress.country) {
      const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
      purchase.shippingAddress.country = shippingCountry.name;
    } else {
      purchase.shippingAddress.country = '';
    }

    if (purchase.billingAddress.state) {
      const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
      purchase.billingAddress.state = billingState.name;
    } else {
      purchase.billingAddress.state = '';
    }

    if (purchase.billingAddress.country) {
      const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
      purchase.billingAddress.country = billingCountry.name;
    } else {
      purchase.billingAddress.country = '';
    }

    let order = new Order(this.totalQuantity, this.totalPrice);
    purchase.order = order;
    purchase.orderItems = this.cartService.cartItems.map(item =>
      new OrderItem(item.imageUrl, item.unitPrice, item.quantity, item.id)
    );

    this.paymentInfo.amount = Math.round(this.totalPrice * 100);
    this.paymentInfo.currency = "USD";
    this.paymentInfo.receiptEmail = purchase.customer.email;

    const hasStripeError = this.displayError && this.displayError.textContent !== "";

    if (!this.checkoutFormGroup.invalid && !hasStripeError) {
      this.isDisabled = true;

      this.checkoutService.createPaymentIntent(this.paymentInfo).subscribe({
        next: (paymentIntentResponse) => {
          this.stripePromise.then((stripe) => {
            if (!stripe) {
              alert('Payment system is unavailable. This is usually caused by an ad blocker. Please disable your ad blocker and refresh the page to continue.');
              this.isDisabled = false;
              return;
            }

            stripe.confirmCardPayment(paymentIntentResponse.client_secret, {
              payment_method: {
                card: this.cardElement,
                billing_details: {
                  email: purchase.customer.email,
                  name: `${purchase.customer.firstName} ${purchase.customer.lastName}`,
                  address: {
                    line1: purchase.billingAddress.street,
                    city: purchase.billingAddress.city,
                    state: purchase.billingAddress.state,
                    postal_code: purchase.billingAddress.zipCode,
                    country: this.billingAddressCountry?.value.code
                  }
                }
              }
            }, { handleActions: false })
            .then((result: any) => {
              if (result.error) {
                alert(`Stripe Error: ${result.error.message}`);
                this.isDisabled = false;
              } else {
                this.checkoutService.placeOrder(purchase).subscribe({
                  next: (response) => {
                    alert(`Order received! Tracking: ${response.orderTrackingNumber}`);
                    this.resetCart();
                    this.isDisabled = false;
                  },
                  error: (err) => {
                    alert(`Backend Error: ${err.message}`);
                    this.isDisabled = false;
                  }
                });
              }
            });
          });
        },
        error: (err) => {
          alert(`Payment Intent Error: ${err.message}`);
          this.isDisabled = false;
        }
      });
    }
  }

  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.persistCartItems();

    this.checkoutFormGroup.reset();
    this.isDisabled = false;

    this.router.navigateByUrl("/products");
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    if (!formGroup || !formGroup.value || !formGroup.value.country) {
      console.warn(`Form group '${formGroupName}' or country data is not available`);
      return;
    }

    const countryCode = formGroup.value.country.code;
    if (!countryCode) {
      console.warn('No country code available');
      return;
    }

    this.shopFormService.getStates(countryCode).subscribe({
      next: (data) => {
        if (!formGroup) return;

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }

        const stateControl = formGroup.get('state');
        if (stateControl && data.length > 0) {
          stateControl.setValue(data[0]);
        }
      },
      error: (err) => {
        console.error('Error fetching states:', err);
      }
    });
  }

  private setupStripePaymentForm() {

    this.stripePromise.then((stripe: Stripe | null) => {
      if (stripe) {
        const elements = stripe.elements();

        this.cardElement = elements.create('card', { hidePostalCode: true });

        this.cardElement.mount('#card-element');

        this.cardElement.on('change', (event: any) => {
          this.displayError = document.getElementById('card-errors');

          if (event.complete) {
            this.displayError.textContent = "";
          } else if (event.error) {
            this.displayError.textContent = event.error.message;
          }
        });
      } else {
        console.warn('Stripe failed to load - possible ad blocker');
        const cardElement = document.getElementById('card-element');
        if (cardElement) {
          cardElement.innerHTML = '<div class="alert alert-warning">Payment system unavailable. Please disable ad blocker and refresh.</div>';
        }
      }
    }).catch((error) => {
      console.error('Error initializing Stripe:', error);
      const cardElement = document.getElementById('card-element');
      if (cardElement) {
        cardElement.innerHTML = '<div class="alert alert-danger">Failed to load payment system. Please try refreshing the page.</div>';
      }
    });
  }

  private getStoredEmail(): string {
    const storedEmail = this.storage.getItem('userEmail');
    if (!storedEmail) {
      return '';
    }

    try {
      const parsed = JSON.parse(storedEmail);
      return typeof parsed === 'string' ? parsed : '';
    } catch (error) {
      console.warn('Invalid user email stored; clearing value.', error);
      this.storage.removeItem('userEmail');
      return '';
    }
  }
}
