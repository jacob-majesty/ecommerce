import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../common/product';

@Component({
  selector: 'app-product-list-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list-table.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListTableComponent {
  @Input() products: Product[] = [];
}
