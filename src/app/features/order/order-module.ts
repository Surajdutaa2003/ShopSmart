import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../components/shared-module';
import { OrderCheckout } from './order-checkout/order-checkout';
import { OrderPlaced } from './order-placed/order-placed';
import { UserOrders } from './user-orders/user-orders';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from '../../constant/route.constant';
import { orderPlacedGuard } from '../../guards/order-placed/order-placed-guard';
import { OrderCheckoutGuard } from '../../guards/order-checkout/order-checkout-guard';

const routes: Routes = [
  { path: ROUTES.order.orderPlaced, component: OrderPlaced, canActivate:[orderPlacedGuard] },
  { path: ROUTES.order.orderCheckout, component: OrderCheckout, canActivate:[OrderCheckoutGuard] },
  { path: ROUTES.order.userOrder, component: UserOrders, canActivate:[OrderCheckoutGuard] },
]

@NgModule({
  declarations: [
    OrderCheckout,
    OrderPlaced,
    UserOrders
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    OrderCheckout,
    OrderPlaced,
    UserOrders
  ]
})
export class OrderModule { }
