import { Component, signal } from '@angular/core';
import { Products } from '../../../services/products/products';
import { Product, ProductResponse } from '../../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductFilter } from '../../../components/product/product-filter/product-filter';
import { slideUp } from '../../../animations/animation';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
  standalone: false,
  animations: [slideUp]
})
export class ProductList {
  categories = signal<string[]>([]);
  isLoading = signal<boolean>(false);
  products = signal<Product[]>([]);
  allFilteredProducts = signal<Product[]>([]);
  filteredProducts = signal<Product[]>([]);
  currentPage = signal<number>(1);
  totalPages = signal<number>(0);
  limit: number = 28;

  constructor(private productService: Products) {
    const savedState = localStorage.getItem('productListState');
    if (savedState) {
      const state = JSON.parse(savedState);
      this.currentPage.set(state.currentPage || 1);
    }
    this.loadCategories();
    this.fetchProducts();
    localStorage.removeItem('selectedCategory');
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
    localStorage.removeItem('selectedCategory');
  }

  private fetchProducts() {
    this.isLoading.set(true);
    this.productService.getProducts().subscribe({
      next: (response: ProductResponse) => {
        this.onProductsFetched(response);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.products.set([]);
        this.allFilteredProducts.set([]);
        this.filteredProducts.set([]);
        this.isLoading.set(false);
      }
    });
  }

  private loadCategories() {
    this.productService.getCategoryList().subscribe({
      next: (categories) => {
        this.categories.set(categories);
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.categories.set([]);
      }
    });
  }

  onProductsFetched(response: ProductResponse) {
    if (response && response.products) {
      this.products.set(response.products);
      this.allFilteredProducts.set(response.products);
      // Let ProductFilter trigger paginateData via onFilterChange
    } else {
      console.error('Invalid product response:', response);
      this.products.set([]);
      this.allFilteredProducts.set([]);
      this.filteredProducts.set([]);
    }
  }

  onFilterChange(filteredProducts: Product[]) {
    this.allFilteredProducts.set(filteredProducts);
    // Reset page only if filter changes the product list
    if (this.allFilteredProducts().length !== this.products().length) {
      this.currentPage.set(1);
    }
    this.paginateData();
  }

  paginateData() {
    const allFiltered = this.allFilteredProducts();
    const currentPageNumber = this.currentPage();
    this.totalPages.set(Math.ceil(allFiltered.length / this.limit));
    const startIndex = (currentPageNumber - 1) * this.limit;
    const endIndex = startIndex + this.limit;
    this.filteredProducts.set(allFiltered.slice(startIndex, endIndex));
    this.saveState();
  }

  nextPage() {
    if (this.currentPage() >= this.totalPages()) return;
    this.currentPage.set(this.currentPage() + 1);
    this.paginateData();
    window.scrollTo(0, 0);
  }

  previousPage() {
    if (this.currentPage() <= 1) return;
    this.currentPage.set(this.currentPage() - 1);
    this.paginateData();
    window.scrollTo(0, 0);
  }

  private saveState() {
    const state = {
      currentPage: this.currentPage()
    };
    const existingState = localStorage.getItem('productListState');
    if (existingState) {
      const parsedState = JSON.parse(existingState);
      localStorage.setItem('productListState', JSON.stringify({ ...parsedState, ...state }));
    } else {
      localStorage.setItem('productListState', JSON.stringify(state));
    }
  }

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
// ss