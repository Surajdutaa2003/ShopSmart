import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product.model';
import { Products } from '../../../services/products/products';
import { Cart } from '../../../services/cart/cart';
import { cartItem } from '../../../models/cart.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css']
})
export class ProductDetails implements OnInit {
  selectedImage: string = '';
  product!: Product;
  isLoading = true;
  quantity: number = 1;
  inCart: boolean = false;
  cart$: cartItem[] | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: Products,
    private cartService: Cart,
    private location: Location
  ) {
    this.cartService.cart$.subscribe((items) => {
      this.cart$ = items;
      if (this.product) {
        this.checkProductInCart(this.product);
      }
    });
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    window.scrollTo(0, 0);
    if (id) {
      this.productService.getProductById(id).subscribe((data: Product) => {
        this.product = data;
        this.selectedImage = data.images?.[0] || '';
        this.isLoading = false;
        this.checkProductInCart(this.product);
      });
    }
  }

  checkProductInCart(product: Product): void {
    const cartItem = this.cart$?.find((item: cartItem) => item.product.id === product.id);
    this.inCart = !!cartItem;
    if (cartItem) {
      this.quantity = cartItem.quantity;
    } else {
      this.quantity = 1;
    }
  }

  onQuantityChange(event: Event) {
    this.quantity = Number((event.target as HTMLSelectElement).value)
  }

  addToCart(): void {
    this.cartService.addToCart(this.product, this.quantity)
  }

  updateCartQuantity(newQuantity: number) {
    if (newQuantity < 1) {
      this.removeFromCart();
    } else {
      this.quantity = newQuantity;
      this.cartService.updateQuantity(this.product, this.quantity, 'set');
    }
  }

  removeFromCart(): void {
    this.cartService.removeItemFromCart(this.product)
  }

  get formattedDimensions(): string {
    const { width, height, depth } = this.product.dimensions || {};
    return width && height && depth
      ? `${width}cm (W) × ${height}cm (H) × ${depth}cm (D)`
      : 'N/A';
  }

  get averageReview(): number {
    if (!this.product.reviews || this.product.reviews.length === 0) return 0;
    const total = this.product.reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return parseFloat((total / this.product.reviews.length).toFixed(1));
  }

  get reviewCount(): number {
    return this.product.reviews?.length || 0;
  }

  get discountPrice(): number {
    return +(this.product.price - (this.product.price * this.product.discountPercentage) / 100).toFixed(2);
  }

  get hasGallery(): boolean {
    console.log(this.product.images);
    return !!this.product?.images && this.product.images.length > 1;
  }

  goBack() {
    this.location.back();
  }

}
