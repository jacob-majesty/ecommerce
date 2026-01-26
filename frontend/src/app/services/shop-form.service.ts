import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  constructor() { }

  /**
   * Generates an array of months for the credit card expiration dropdown.
   * If the selected year is the current year, it starts from the current month.
   */
  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }

    return of(data);
  }

  /**
   * Generates an array of the next 10 years for the credit card expiration dropdown.
   */
  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }

    return of(data);
  }
}
