import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Products } from '../../services/products/products';
import { Router } from '@angular/router';
import { CATEGORY_IMAGES } from '../../config/category-image';
import { trigger, transition, style, animate } from '@angular/animations';
import { fadeIn, slideUp } from '../../animations/animation';

@Component({
  selector: 'app-main-home',
  standalone: false,
  templateUrl: './main-home.html',
  styleUrl: './main-home.css',
  animations: [fadeIn, slideUp]
})

export class MainHome implements OnInit {
  products: Product[] = [];
  categories: string[] = [];
  featuredProducts: Product[] = [];
  loading = true;
  error: string | null = null;

  categoryImages = CATEGORY_IMAGES

  constructor(
    private productService:Products,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.products;
        this.featuredProducts = this.products.slice(0, 20);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.loading = false;
        console.error('Error loading products:', err);
      }
    });
  }

  loadCategories() {
    this.productService.getCategoryList().subscribe({
      next: (categories) => {
        this.categories = categories.slice(0, 5);
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  navigateToProducts() {
    this.router.navigate(['products']);
  }

  navigateToProductDetails(productId: number) {
    this.router.navigate(['products', productId]);
  }

  navigateToCart() {
    this.router.navigate(['cart']);
  }

  addToCart(product: Product, event: Event) {
    event.stopPropagation();
    // Add to cart logic here
    console.log('Adding to cart:', product);
  }

  getDiscountedPrice(price: number, discount: number): number {
    return price - (price * discount / 100);
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 1 : 0);
  }

  onCategorySelect(category: string) {
    localStorage.setItem("fromHomePage", "true")
    localStorage.setItem('selectedCategoryFromHome', category);
    this.router.navigate(['/home/products']);
  }

  navigateToProductsPage() {
    localStorage.setItem("fromHomePage", "true")
    localStorage.removeItem("selectedCategoryFromHome")
    this.router.navigate(['/home/products'])
  }
}
