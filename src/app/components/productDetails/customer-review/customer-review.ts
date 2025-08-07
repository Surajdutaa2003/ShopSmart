import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../../services/products/products';

@Component({
  selector: 'app-customer-review',
  standalone: false,
  templateUrl: './customer-review.html',
  styleUrl: './customer-review.css'
})
export class CustomerReview {
 @Input() product!: Product;

  get averageReview(): number {
    if (!this.product.reviews || this.product.reviews.length === 0) return 0;
    const total = this.product.reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return parseFloat((total / this.product.reviews.length).toFixed(1));
  }

  get reviewCount(): number {
    return this.product.reviews?.length || 0;
  }

  get hasReviews(): boolean {
    return !!this.product?.reviews && this.product.reviews.length > 0;
  }
}
