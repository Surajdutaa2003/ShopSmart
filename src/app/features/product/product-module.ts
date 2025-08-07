import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../components/shared-module';
import { ProductList } from './product-list/product-list';
import { ProductDetails } from './product-details/product-details';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from '../../constant/route.constant';

const routes: Routes = [
  { path: ROUTES.product.default, component: ProductList },
  { path: ROUTES.product.detail, component: ProductDetails },
]

@NgModule({
  declarations: [
    ProductList,
    ProductDetails
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProductList,
    ProductDetails
  ]
})
export class ProductModule { }
