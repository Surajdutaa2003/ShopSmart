import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HttpClientModule } from '@angular/common/http';
import { MainLayout } from './layout/main-layout/main-layout';
import { LayoutModule } from './layout/layout-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductModule } from './features/product/product-module';
import { ProductCartModule } from './features/cart/product-cart-module';
import { AuthModule } from './features/auth/auth-module';
import { OrderModule } from './features/order/order-module';


@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    ProductModule,
    ProductCartModule,
    AuthModule,
    OrderModule
  
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
