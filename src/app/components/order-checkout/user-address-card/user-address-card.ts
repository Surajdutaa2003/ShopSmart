import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from '../../../models/auth.model';

@Component({
  selector: 'app-user-address-card',
  standalone: false,
  templateUrl: './user-address-card.html',
  styleUrl: './user-address-card.css'
})
export class UserAddressCard {
  @Input() address: Address = {
    houseNo: '',
    locality: '',
    city: '',
    state: '',
    country: ''
  }

  @Input() selectedAddress: Address = {
    houseNo: '',
    locality: '',
    city: '',
    state: '',
    country: ''
  }

  @Output() addressSelect = new EventEmitter()


}
