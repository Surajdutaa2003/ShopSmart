import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Header } from './common/header/header';
import { Footer } from './common/footer/footer';
import { RouterModule } from '@angular/router';
import { Snackbar } from './dialog/snackbar/snackbar';
import { MatIconModule } from '@angular/material/icon';
import { CartCard } from './productCart/cart-card/cart-card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductPlaceholder } from './product/product-placeholder/product-placeholder';
import { ProductInfoCard } from './productDetails/product-info-card/product-info-card';
import { CustomerReview } from './productDetails/customer-review/customer-review';
import { WrapperProductInfoCard } from './productDetails/wrapper-product-info-card/wrapper-product-info-card';
import { MainHome } from './main-home/main-home';
import { ClearCartDialog } from './productCart/clear-cart-dialog/clear-cart-dialog';
import { FeaturedProducts } from './productCart/featured-products/featured-products';
import { ProductFilter } from './product/product-filter/product-filter';
import { Card } from './product/productList/card/card';
import { LoginRequiredDialog } from './dialog/login-required-dialog/login-required-dialog';
import { Menu } from './common/menu/menu';
import { MatMenuModule } from '@angular/material/menu';
import { MatDivider } from '@angular/material/divider';
import { UserAddressCard } from './order-checkout/user-address-card/user-address-card';
import { UserAddAddress } from './order-checkout/user-add-address/user-add-address';
import { PaymentMethods } from './order-checkout/payment-methods/payment-methods';
import { UserOrderCard } from './user-orders/user-order-card/user-order-card';
import { LogoLink } from './common/logo-link/logo-link';

@NgModule({
  declarations: [
    Header,
    Footer,
    Card,
    Snackbar,
    CartCard,
    ProductPlaceholder,
    ProductInfoCard,
    CustomerReview,
    WrapperProductInfoCard,
    MainHome,
    ClearCartDialog,
    FeaturedProducts,
    ProductFilter,
    LoginRequiredDialog,
    Menu,
    UserAddressCard,
    UserAddAddress,
    PaymentMethods,
    UserOrderCard,
    LogoLink

  ],
  imports: [CommonModule, RouterModule, MatIconModule, ReactiveFormsModule, FormsModule, DatePipe, MatMenuModule, MatDivider],
  exports: [Header, Footer, Card, CartCard, ProductPlaceholder,
    ProductInfoCard,
    CustomerReview,
    WrapperProductInfoCard, MainHome, ClearCartDialog, FeaturedProducts, ProductFilter,LoginRequiredDialog, UserAddressCard, UserAddAddress,
    PaymentMethods, UserOrderCard, LogoLink],
})
export class SharedModule { }
