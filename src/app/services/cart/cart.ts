import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cartItem } from '../../models/cart.model';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private cartSubject = new BehaviorSubject<cartItem[]>(this.getCart());
  cart$ = this.cartSubject.asObservable();
  private orderJustPlaced = false

  constructor() {
    const existingCart = localStorage.getItem('cart');
    if (!existingCart) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
  }

  setOrderPlaced(value: boolean){
    this.orderJustPlaced = value
  }

  isOrderJustPlaced(): boolean{
    return this.orderJustPlaced
  }

  public getCart(): cartItem[] {
    try {
      const cart = JSON.parse(localStorage.getItem('cart')!);
      return Array.isArray(cart) ? cart : [];
    } catch (error) {
      console.error('Error parsing cart data from localStorage:', error);
      return [];
    }
  }

  private updateCart(cart: cartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  addToCart(product: Product, quantity: number = 1) {
    const cart = this.getCart();
    const findItem = cart.find((item) => item.product.id === product.id);
    if (findItem) {
      findItem.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    this.updateCart(cart);
  }

  updateQuantity(product: Product, quantity: number, type: string) {
    const cart = this.getCart();
    const findItem = cart.find((item) => item.product.id === product.id);
    if (!findItem) return;

    if (type === 'inc') {
      findItem.quantity += 1;
    } else if (type === 'dec' && findItem.quantity > 1) {
      findItem.quantity -= 1;
    } else if (type === 'set') {
      findItem.quantity = quantity;
    }

    this.updateCart(cart);
  }

  removeItemFromCart(product: Product) {
    const cart = this.getCart().filter((item) => item.product.id !== product.id);
    this.updateCart(cart);
  }

  resetCart() {
    this.updateCart([]);
  }

  getSubtotal(): number {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  getTax(subtotal?: number): number {
    const calcSubtotal = subtotal || this.getSubtotal();
    return calcSubtotal * 0.05;
  }

  getShipping(subtotal?: number): number {
    const calcSubtotal = subtotal || this.getSubtotal();
    return calcSubtotal > 50 ? 0 : 5.99; 
  }

  getTotal(): number {
    const subtotal = this.getSubtotal();
    const tax = this.getTax(subtotal);
    const shipping = this.getShipping(subtotal);
    return subtotal + tax + shipping;
  }
}
