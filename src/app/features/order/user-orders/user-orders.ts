import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user';
import { OrderPlacedDetails } from '../../../models/order.model';
import { ROUTES } from '../../../constant/route.constant';
import { calculateOrderTotalUtility, formatDateUtility, formatPaymentMethodUtiliy } from './user-orders.utils';

@Component({
  selector: 'app-user-orders',
  standalone: false,
  templateUrl: './user-orders.html',
  styleUrl: './user-orders.css'
})
export class UserOrders implements OnInit {
  orders: OrderPlacedDetails[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  routes = ROUTES;

  formatDate = formatDateUtility
  formatPaymentMethod = formatPaymentMethodUtiliy
  calculateOrderTotal = calculateOrderTotalUtility

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadOrderHistory();
  }

  loadOrderHistory(): void {
    this.isLoading = true;
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        if (user && user.orderPlaced && user.orderPlaced.length > 0) {
          this.orders = [...user.orderPlaced].sort((a, b) => {
            return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
          });
        } else {
          this.orders = [];
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        this.errorMessage = 'Failed to load order history. Please try again later.';
        this.isLoading = false;
      }
    });
  }



  navigateToProducts(): void {
    this.router.navigate([`/${ROUTES.home}/${ROUTES.product.parent}`]);
  }
}
