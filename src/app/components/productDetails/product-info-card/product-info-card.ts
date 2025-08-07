import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../../services/products/products';

@Component({
  selector: 'app-product-info-card',
  standalone: false,
  templateUrl: './product-info-card.html',
  styleUrl: './product-info-card.css'
})
export class ProductInfoCard {
  @Input() product!: Product;

  get formattedDimensions(): string {
    const { width, height, depth } = this.product.dimensions || {};
    return width && height && depth
      ? `${width}cm (W) × ${height}cm (H) × ${depth}cm (D)`
      : 'N/A';
  }

}
