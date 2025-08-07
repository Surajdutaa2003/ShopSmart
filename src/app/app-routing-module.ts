import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { ROUTES } from './constant/route.constant';
import { MainHome } from './components/main-home/main-home';



const routes: Routes = [
  { path: ROUTES.default, redirectTo: ROUTES.home, pathMatch: 'full' },
  {
    path: ROUTES.auth.parent,
    loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: ROUTES.home,
    component: MainLayout,
    children: [
      { path: ROUTES.default, component: MainHome },
      {
        path: ROUTES.product.parent,
        loadChildren: () => import('./features/product/product-module').then(m => m.ProductModule)
      },
      {
        path: ROUTES.order.parent,
        loadChildren: () => import('./features/order/order-module').then(m => m.OrderModule)
      },
      {
        path: ROUTES.cart.parent,
        loadChildren: () => import('./features/cart/product-cart-module').then(m => m.ProductCartModule)
      }
    ]
  },
  { path: ROUTES.wildcard, redirectTo: ROUTES.home, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
