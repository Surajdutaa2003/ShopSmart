import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-placeholder',
  standalone: false,
  templateUrl: './product-placeholder.html',
  styleUrls: ['./product-placeholder.css']
})
export class ProductPlaceholder {
  @Input() isLoading: boolean = false;
  @Input() hasNoProducts: boolean = false;
  @Output() clearFilters = new EventEmitter<void>();

  // Array for skeleton placeholders (e.g., 6 placeholders to mimic a grid)
  skeletonItems = Array(6).fill(0);
}