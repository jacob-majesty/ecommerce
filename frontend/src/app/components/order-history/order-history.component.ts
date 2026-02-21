import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {OrderHistoryService} from "../../services/order-history.service";
import {OrderHistory} from "../../common/order-history";
import {CurrencyPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements  OnInit {

  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;

  constructor(private orderHistoryService: OrderHistoryService) { }

  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory() {
    const storedEmail = this.storage.getItem('userEmail');

    if (storedEmail) {
      const theEmail = JSON.parse(storedEmail);

      this.orderHistoryService.getOrderHistory(theEmail).subscribe(
        data => {
          this.orderHistoryList = data._embedded.orders;
        },
        error => {
          console.error('Error fetching order history', error);
        }
      );
    }
  }
}
