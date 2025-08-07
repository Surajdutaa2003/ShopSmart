import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cartItem } from '../../../models/cart.model';

@Component({
  selector: 'app-cart-card',
  standalone: false,
  templateUrl: './cart-card.html',
  styleUrl: './cart-card.css'
})
export class CartCard {

  @Input() item: cartItem = {
    product: {
      id: 0,
      title: '',
      description: '',
      category: "",
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      tags: [''],
      brand: '',
      sku: '',
      weight: 0,
      dimensions: {
        width: 0,
        height: 0,
        depth: 0
      },
      warrantyInformation: '',
      shippingInformation: '',

    },
    quantity: 0
  }

  @Output() onQuantityChange = new EventEmitter()
  @Output() removeFromCart = new EventEmitter()

  constructor() { }

  getQuantityOptions(): number[] {
    const max = Math.max(10, Number(this.item.quantity) || 1);
    return Array.from({length: max}, (_, i) => i + 1);
  }
}
// ss