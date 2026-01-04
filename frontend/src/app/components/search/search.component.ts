import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  private router = inject(Router);

  /**
   * Navigates to the search results route based on the provided keyword.
   * @param value The search keyword entered by the user.
   */
  doSearch(value: string): void {
    console.log(`Searching for value: ${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }
}
