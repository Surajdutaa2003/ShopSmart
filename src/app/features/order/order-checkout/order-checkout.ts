import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Address } from '../../../models/auth.model';
import { UserService } from '../../../services/user/user';
import { Cart } from '../../../services/cart/cart';
import { cartItem } from '../../../models/cart.model';
import { paymentOptions } from '../../../constant/payment.constant';
import { OrderPlacedDetails } from '../../../models/order.model';
import { calculateEstimate } from './order-checkout.utils';
import { ROUTES } from '../../../constant/route.constant';

@Component({
  selector: 'app-order-checkout',
  standalone: false,
  templateUrl: './order-checkout.html',
  styleUrl: './order-checkout.css'
})
export class OrderCheckout implements OnInit {
  private routes = ROUTES;

  protected isProcessingOrder: boolean = false;
  protected orderProcessingStage: string = '';

  protected addresses: Array<Address> = []
  protected selectedAddress: Address | null = null
  protected selectedPayment: string = paymentOptions[0].id
  protected cart: cartItem[] = []
  protected subtotal: number = 0
  protected tax: number = 0
  protected shipping: number = 0
  protected total: number = 0
  protected estimatedDeliveryDate: string = ''
  protected paymentMethods = paymentOptions
  protected isAddingAddress: boolean = false
  protected newAddress: Address = {
    houseNo: '',
    locality: '',
    city: '',
    state: '',
    country: ''
  }
  protected addressFormError: string = '';
  protected orderError: string = '';
  protected addressSaveError: string = '';

  constructor(
    private userService: UserService,
    private cartService: Cart,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getUserAddresses()
    this.getCartItems()
    this.calculateEstimatedDelivery()
  }

  getCartItems() {
    this.cart = this.cartService.getCart() || [];
    this.calculateTotals();
  }

  calculateTotals() {
    this.subtotal = this.cartService.getSubtotal();
    this.tax = this.cartService.getTax(this.subtotal);
    this.shipping = this.cartService.getShipping(this.subtotal);
    this.total = this.cartService.getTotal();
  }

  calculateEstimatedDelivery() {
    this.estimatedDeliveryDate = calculateEstimate()
  }

  getUserAddresses() {
    this.userService.getCurrentUser().subscribe({
      next: (data) => {
        this.addresses = data?.address ?? []
        if (this.addresses.length > 0) {
          this.selectedAddress = this.addresses[0]
        }
      },
      error: (err) => {
        console.log("error in order checkout", err?.message ?? err)
      }
    })
  }

  onAddressSelect(address: Address) {
    this.selectedAddress = address
  }

  toggleAddNewAddress() {
    this.isAddingAddress = !this.isAddingAddress
  }

  saveNewAddress() {
    this.addressFormError = '';

    if (!this.newAddress.houseNo || !this.newAddress.city ||
      !this.newAddress.state || !this.newAddress.country) {
      this.addressFormError = 'Please fill in all required fields';
      return;
    }

    this.userService.addNewAddress(this.newAddress).subscribe({
      next: (updatedUser) => {
        this.addresses = updatedUser.address || [];
        this.selectedAddress = this.addresses[this.addresses.length - 1];
        this.isAddingAddress = false;
        this.newAddress = {
          houseNo: '',
          locality: '',
          city: '',
          state: '',
          country: ''
        };
      },
      error: (err) => {
        console.error('Failed to save address:', err);
        this.addressSaveError = 'Could not save your address. Please try again.';
      }
    });
  }

  closeForm() {
    this.isAddingAddress = false
  }

  selectPaymentMethod(method: string) {
    this.selectedPayment = method
  }

  placeOrder() {
    this.orderError = '';

    if (!this.selectedAddress) {
      this.orderError = 'Please select a delivery address';
      return;
    }

    if (!this.selectedPayment) {
      this.orderError = 'Please select a payment method';
      return;
    }

    this.isProcessingOrder = true;
    this.orderProcessingStage = 'Processing payment...';

    const processingSnackBarRef = this.snackBar.open('Processing your order...', '', {
      duration: 0,
      panelClass: ['processing-order-snackbar']
    });

    const orderData: OrderPlacedDetails = {
      paymentMethod: this.selectedPayment,
      orderDate: new Date().toISOString(),
      products: this.cart,
      address: this.selectedAddress
    };

    setTimeout(() => {
      this.orderProcessingStage = 'Verifying inventory...';
      setTimeout(() => {
        this.orderProcessingStage = 'Finalizing your order...';

        setTimeout(() => {
          processingSnackBarRef.dismiss();

          this.userService.addUserOrderPlaced(orderData).subscribe({
            next: () => {
              this.snackBar.open('Order placed successfully!', 'Close', {
                duration: 5000,
                panelClass: ['order-success-snackbar']
              });

              this.cartService.resetCart();
              this.router.navigate([`/${this.routes.home}/${this.routes.order.parent}/${this.routes.order.orderPlaced}`]);
              this.isProcessingOrder = false;
            },
            error: (err) => {
              console.error('Failed to place order:', err);
              this.orderError = 'Could not place your order. Please try again.';
              this.isProcessingOrder = false;

              this.snackBar.open('Error placing your order. Please try again.', 'Close', {
                duration: 5000,
                panelClass: ['order-error-snackbar']
              });
            }
          });
        }, 1200);
      }, 1500);
    }, 2000);
  }
}
