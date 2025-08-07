import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-product-fetch',
  standalone: false,
  templateUrl: './product-fetch.html',
  styleUrls: ['./product-fetch.css'],
})
export class ProductFetch  {
  // @Output() productsFetched = new EventEmitter<ProductResponse>();

  // constructor(private productsService: Products) { }

  // ngOnInit() {
  //   this.fetchProducts();
  // }

  // fetchProducts() {
  //   this.productsService.getProducts().subscribe({
  //     next: (response: ProductResponse) => {
  //       this.productsFetched.emit(response);
  //     },
  //     error: (error) => console.error('Error fetching products:', error),
  //   });
  // }
}
