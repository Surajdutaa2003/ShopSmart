import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-payment-methods',
  standalone: false,
  templateUrl: './payment-methods.html',
  styleUrl: './payment-methods.css'
})
export class PaymentMethods {
  @Input() method: {
    id: string,
    name: string
  } = {
    id: '',
    name: ''
  }

  @Input() selectedPayment: string = ''

  @Output() onPaymentMethodSelect = new EventEmitter()
}
