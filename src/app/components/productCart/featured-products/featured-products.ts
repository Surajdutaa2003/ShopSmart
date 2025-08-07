import { Component, Input, OnInit } from '@angular/core';
import { Products } from '../../../services/products/products';
import { Product } from '../../../models/product.model';
import { cartItem } from '../../../models/cart.model';

@Component({
  selector: 'app-featured-products',
  standalone: false,
  templateUrl: './featured-products.html',
  styleUrls: ['./featured-products.css']
})
export class FeaturedProducts implements OnInit {
  @Input() cartItems: cartItem[] = [];
  featuredProducts: Product[] = [];
  loading = false;

  constructor(private productService: Products) {}

  ngOnInit() {
    if (!this.cartItems || this.cartItems.length === 0) return;

    const categoryCount: { [key: string]: number } = {};
    this.cartItems.forEach(item => {
      const cat = item.product.category;
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });
    const mostCommonCategory = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])[0][0];

    this.loading = true;
    this.productService.getProductByCategory(mostCommonCategory).subscribe(res => {
      const cartProductIds = new Set(this.cartItems.map(item => item.product.id));
      this.featuredProducts = res.products.filter(p => !cartProductIds.has(p.id))
      this.loading = false;
    });
  }
}
