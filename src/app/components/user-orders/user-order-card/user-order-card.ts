import { Component, Input } from '@angular/core';
import { OrderPlacedDetails } from '../../../models/order.model';
import { calculateOrderTotalUtility, formatDateUtility, formatPaymentMethodUtiliy } from '../../../features/order/user-orders/user-orders.utils';

@Component({
  selector: 'app-user-order-card',
  standalone: false,
  templateUrl: './user-order-card.html',
  styleUrl: './user-order-card.css'
})
export class UserOrderCard {
  @Input() order: OrderPlacedDetails = {
    paymentMethod: '',
    orderDate: '',
    products: [],
    address: {
      houseNo: '',
      locality: '',
      city: '',
      state: '',
      country: ''
    }
  }

  formatDate = formatDateUtility
  formatPaymentMethod = formatPaymentMethodUtiliy
  calculateOrderTotal = calculateOrderTotalUtility

}
