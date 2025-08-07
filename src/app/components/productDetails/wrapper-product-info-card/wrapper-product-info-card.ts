import { Component } from '@angular/core';

@Component({
  selector: 'app-wrapper-product-info-card',
  standalone: false,
  templateUrl: './wrapper-product-info-card.html',
  styleUrl: './wrapper-product-info-card.css'
})
export class WrapperProductInfoCard {
  isDetailsOpen = true;
  isShippingOpen = false;
  isReturnPolicyOpen = false;

  toggleDetails(): void {
    this.isDetailsOpen = !this.isDetailsOpen;
  }

  toggleShipping(): void {
    this.isShippingOpen = !this.isShippingOpen;
  }

  toggleReturnPolicy(): void {
    this.isReturnPolicyOpen = !this.isReturnPolicyOpen;
  }
}
