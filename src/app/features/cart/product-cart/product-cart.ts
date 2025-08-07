import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../services/cart/cart';
import { cartItem } from '../../../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from '../../../components/dialog/snackbar/snackbar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ClearCartDialog } from '../../../components/productCart/clear-cart-dialog/clear-cart-dialog';
import { ROUTES } from '../../../constant/route.constant';
import { UserService } from '../../../services/user/user';
import { LoginRequiredDialog } from '../../../components/dialog/login-required-dialog/login-required-dialog';

@Component({
  selector: 'app-product-cart',
  standalone: false,
  templateUrl: './product-cart.html',
  styleUrl: './product-cart.css'
})
export class ProductCart implements OnInit {
  cartItems: cartItem[] = [];
  subtotal: number = 0;
  itemCount: number = 0;
  isLoading: boolean = false; 

  isLoggedIn: boolean = false
  
  constructor(
    public cartService: Cart,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private authService: UserService
  ) {}
  
  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });

    this.authService.isLoggedIn$.subscribe((data) => this.isLoggedIn = data)

    window.scrollTo(0,0)
  }
  
  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce((total, item) => 
      total + Number(item.product.price * item.quantity), 0);
    
    this.itemCount = this.cartItems.reduce((count, item) => 
      count + Number(item.quantity), 0);
  }
  
  updateQuantity(item: cartItem, type: 'inc' | 'dec'): void {
    this.cartService.updateQuantity(item.product, 1, type);
  }
  
  removeFromCart(item: cartItem): void {
    this.cartService.removeItemFromCart(item.product);
    
    this.snackBar.openFromComponent(Snackbar, {
      data: {
        message: 'Removed from cart',
        product: item.product
      },
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['amazon-style-snackbar', 'solid-background-snackbar']
    });
  }
  
  continueToCheckout(): void {
    if (!this.isLoggedIn) {
      this.showLoginRequiredDialog();
      return;
    }
    
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.cartService.setOrderPlaced(true);
      this.router.navigate([`/${ROUTES.home}/${ROUTES.order.parent}/${ROUTES.order.orderCheckout}`]);
    }, 1800);
  }
  
  private showLoginRequiredDialog(): void {
    const dialogRef = this.dialog.open(LoginRequiredDialog, {
      width: '400px',
      maxWidth: '95vw',
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-backdrop',
      autoFocus: false,
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'login') {
        this.router.navigate([`${ROUTES.auth.parent}/${ROUTES.auth.login}`], { 
          queryParams: { returnUrl: `/${ROUTES.home}/${ROUTES.cart.parent}`  } 
        });
      } else if (result === 'signup') {
        this.router.navigate([`${ROUTES.auth.parent}/${ROUTES.auth.register}`]);
      }
    });
  }
  
  continueShopping(): void {
    this.router.navigate(['/home/products']);
  }
  
  clearCart(): void {
    const dialogRef = this.dialog.open(ClearCartDialog, {
      panelClass: 'custom-dialog-container',
      backdropClass: 'custom-backdrop',
      disableClose: false,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.cartService.resetCart();
      }
    });
  }

  onQuantityChange(newValue: number, item: cartItem) {
    if (newValue === 0) {
      this.removeFromCart(item);
    } else {
      this.cartService.updateQuantity(item.product, newValue, 'set');
    }
  }
}
