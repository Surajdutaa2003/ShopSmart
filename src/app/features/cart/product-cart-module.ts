import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../components/shared-module';
import { ProductCart } from './product-cart/product-cart';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from '../../constant/route.constant';

const routes: Routes = [
  {path: ROUTES.cart.default, component: ProductCart}
]

@NgModule({
  declarations: [
    ProductCart
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductCartModule { }
