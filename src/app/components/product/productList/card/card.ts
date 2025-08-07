import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from '../../../../models/product.model';
import { Cart } from '../../../../services/cart/cart';
import { Snackbar } from '../../../dialog/snackbar/snackbar';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.html',
  styleUrls: ['./card.css'],
})
export class Card implements OnInit {
  @Input() product: Product | null = null;
  cartQuantity: number = 0;

  constructor(
    private cartService: Cart,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe((cartItems) => {
      const cartItem = cartItems.find((item) => item.product.id === this.product?.id);
      this.cartQuantity = cartItem ? cartItem.quantity : 0;
    });
    // Normalize rating to handle floating-point precision issues
    if (this.product && this.product.rating) {
      this.product.rating = Math.round(this.product.rating * 10) / 10; // Round to 1 decimal place
    }
  }

  addProductToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);
      this.showSnackbar('Added to cart', this.product);
    }
  }

  updateQuantity(type: 'inc' | 'dec') {
    if (this.product) {
      this.cartService.updateQuantity(this.product, 1, type);
      if (type === 'inc') {
        this.showSnackbar('Updated quantity', this.product);
      }
    }
  }

  removeFromCart() {
    if (this.product) {
      this.cartService.removeItemFromCart(this.product);
      this.showSnackbar('Removed from cart', this.product);
    }
  }

  private showSnackbar(message: string, product: Product): void {
    this.snackBar.openFromComponent(Snackbar, {
      data: {
        message,
        product
      },
      duration: 4000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['amazon-style-snackbar']
    });
  }

  clickImage() {
    this.router.navigate(['/home/products', this.product?.id]);
  }
}