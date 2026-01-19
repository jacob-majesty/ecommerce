import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {CurrencyPipe} from "@angular/common";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  standalone: true,
  imports: [
    CurrencyPipe,
    RouterLink
  ],
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
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }
}
