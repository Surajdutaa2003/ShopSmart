import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../../../services/cart/cart';
import { UserService } from '../../../services/user/user';
import { cartItem } from '../../../models/cart.model';
import { formatPaymentMethod, generateOrderNumber, getEstimatedDelivery, getUserName } from './order-placed.utils';
import { OrderPlacedDetails } from '../../../models/order.model';
import { ROUTES } from '../../../constant/route.constant';

@Component({
  selector: 'app-order-placed',
  standalone: false,
  templateUrl: './order-placed.html',
  styleUrl: './order-placed.css'
})
export class OrderPlaced implements OnInit {

  routes = ROUTES

  orderItems: cartItem[] = [];
  orderTotal: number = 0;
  orderNumber: string = '';
  estimatedDelivery: string = '';
  orderDate: string = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  customerName: string = 'User XYZ';
  customerAddress: string = '123 Example Street';
  customerCity: string = 'Anytown';
  customerState: string = 'ST';
  customerCountry: string = '12345';
  paymentMethod: string = 'Credit Card ending in **89';

  constructor(
    private cartService: Cart,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.fetchOrder()
  }

  private fetchOrder() {
    this.userService.getUserLatestOrder().subscribe({
      next: (latestOrder) => {
        if (latestOrder) {
          this.setOrderDetails(latestOrder)
        } else {
          this.setCartFallback();
        }
      },
      error: (error) => {
        console.error('Error fetching latest order:', error);
        this.setCartFallback();
      }
    });

    this.cartService.setOrderPlaced(false);
    this.cartService.resetCart();

    localStorage.removeItem("productListState")
  }

  private setOrderDetails(latestOrder: OrderPlacedDetails) {
    if (latestOrder.orderDate) {
      this.orderDate = new Date(latestOrder.orderDate).toLocaleDateString('en-US',
        { day: 'numeric', month: 'long', year: 'numeric' });
    }

    this.paymentMethod = formatPaymentMethod(latestOrder.paymentMethod);

    if (latestOrder.products && latestOrder.products.length > 0) {
      this.orderItems = latestOrder.products;

      this.orderTotal = this.orderItems.reduce((total, item) =>
        total + (Number(item.product.price) * item.quantity), 0);
    }

    if (latestOrder.address) {
      this.customerName = getUserName();
      this.customerAddress = latestOrder.address.houseNo +
        (latestOrder.address.locality ? ', ' + latestOrder.address.locality : '');
      this.customerCity = latestOrder.address.city || '';
      this.customerState = latestOrder.address.state || '';
      this.customerCountry = latestOrder.address.country || '';
    }

    this.orderNumber = generateOrderNumber();

    this.estimatedDelivery = getEstimatedDelivery();
  }

  private setCartFallback(): void {
    this.orderItems = [...this.cartService.getCart()];
    this.orderTotal = this.orderItems.reduce((total, item) =>
      total + Number(item.product.price * item.quantity), 0);
    this.orderNumber = generateOrderNumber();
    this.estimatedDelivery = getEstimatedDelivery();
    this.customerName = getUserName();
  }

  continueShopping(): void {
    this.router.navigate([`${this.routes.home}/${this.routes.product.parent}`]);
  }

  viewOrders(): void {
  this.router.navigate([`${this.routes.home}/${this.routes.order.parent}/${this.routes.order.userOrder}`]);
  }

}
