import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Product } from '../../../models/product.model';
import { Search } from '../../../services/search/search';


@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.html',
  styleUrls: ['./product-filter.css'],
  standalone: false,
})
export class ProductFilter {
  @Input() products: Product[] = [];
  @Input() categories: string[] = [];
  @Output() filterChange = new EventEmitter<Product[]>();

  allFilteredProducts = signal<Product[]>([]);
  selectedCategory = signal<string>(localStorage.getItem('selectedCategoryFromHome') || '');
  maxPrice = signal<number | null>(null);
  minRating = signal<number>(0);
  sortBy = signal<string | undefined>('None');
  order = signal<'asc' | 'desc'>('asc');
  searchQuery = signal<string>('');
  isFiltersOpen = signal<boolean>(false);

  constructor(private search: Search) {
    const savedState = localStorage.getItem('productListState');
    const savedCategoryFromHome = localStorage.getItem('selectedCategoryFromHome');
    const fromHomePage = localStorage.getItem('fromHomePage');
    if (!fromHomePage && savedState) {
      const state = JSON.parse(savedState);
      this.selectedCategory.set(state.selectedCategory || '');
      this.maxPrice.set(state.maxPrice || null);
      this.minRating.set(state.minRating || 0);
      this.sortBy.set(state.sortBy || undefined);
      this.order.set(state.order || 'asc');
      this.searchQuery.set(state.searchQuery || '');
    }
    if (fromHomePage && savedCategoryFromHome) {
      this.selectedCategory.set(savedCategoryFromHome);
    }
    if (fromHomePage) {
      localStorage.removeItem('fromHomePage');
    }

    this.search.searchQuery$.subscribe(q => {
      this.searchQuery.set(q);
      this.saveState();
      this.applyFilters();
    });
  }

  ngOnChanges() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.products;
    const query = this.searchQuery().trim().toLowerCase();
    const category = this.selectedCategory();
    const maxPrice = this.maxPrice();
    const minRating = this.minRating();
    const sortBy = this.sortBy();
    const order = this.order();

    if (query) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query)
      );
    } else if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    if (maxPrice !== null && maxPrice > 0) {
      filtered = filtered.filter(product => product.price <= maxPrice);
    }
    if (minRating !== null && minRating > 0) {
      filtered = filtered.filter(product => product.rating >= minRating);
    }

    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        let comparison = 0;
        switch (sortBy) {
          case 'title':
            comparison = a.title.localeCompare(b.title);
            break;
          case 'price':
            comparison = a.price - b.price;
            break;
          case 'rating':
            comparison = a.rating - b.rating;
            break;
          case 'category':
            comparison = a.category.localeCompare(b.category);
            break;
        }
        return order === 'asc' ? comparison : -comparison;
      });
    }

    this.allFilteredProducts.set(filtered);
    this.filterChange.emit(filtered);
    this.saveState();
  }

  onSortByChange() {
    this.saveState();
    this.applyFilters();
  }

  onSortOrderChange() {
    this.saveState();
    this.applyFilters();
  }

  onCategoryChange() {
    this.saveState();
    this.applyFilters();
  }

  onPriceChange() {
    this.saveState();
    this.applyFilters();
  }

  onRatingChange() {
    this.saveState();
    this.applyFilters();
  }

  clearFilters() {
    this.selectedCategory.set('');
    this.maxPrice.set(null);
    this.minRating.set(0);
    this.sortBy.set('None');
    this.order.set('asc');
    this.searchQuery.set('');
    this.search.updateSearchQuery('');
    this.saveState();
    this.applyFilters();
  }

  toggleFilters() {
    this.isFiltersOpen.set(!this.isFiltersOpen());
  }

  closeFilters() {
    this.isFiltersOpen.set(false);
  }

  private saveState() {
    const state = {
      selectedCategory: this.selectedCategory(),
      maxPrice: this.maxPrice(),
      minRating: this.minRating(),
      sortBy: this.sortBy(),
      order: this.order(),
      searchQuery: this.searchQuery()
    };
    const existingState = localStorage.getItem('productListState');
    if (existingState) {
      const parsedState = JSON.parse(existingState);
      localStorage.setItem('productListState', JSON.stringify({ ...parsedState, ...state }));
    } else {
      localStorage.setItem('productListState', JSON.stringify(state));
    }
  }
}