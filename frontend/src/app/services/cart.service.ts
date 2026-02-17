import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  private storage: Storage = sessionStorage;
  //private storage: Storage = localStorage;

  constructor() {
    this.readStorage();
  }

  private readStorage() {
    const storedData = this.storage.getItem('cartItems');

    if (storedData) {
      try {
        this.cartItems = JSON.parse(storedData);
        this.computeCartTotals();
      } catch (e) {
        console.error("Error parsing cart data from session storage", e);
        this.cartItems = [];
      }
    }
  }

  addToCart(theCartItem: CartItem) {
    const existingCartItem = this.cartItems.find(temp => temp.id === theCartItem.id);

    if (existingCartItem) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * (currentCartItem.unitPrice ?? 0);
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.persistCartItems();
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(temp => temp.id === theCartItem.id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}
