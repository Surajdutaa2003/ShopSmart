import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from '../../../models/auth.model';

@Component({
  selector: 'app-user-add-address',
  standalone: false,
  templateUrl: './user-add-address.html',
  styleUrl: './user-add-address.css'
})
export class UserAddAddress {
  @Input() newAddress: Address = {
    houseNo: '',
    locality: '',
    city: '',
    state: '',
    country: ''
  }

  @Input() addressFormError: string = ''
  @Input() addressSaveError: string = ''
  @Input() isAddingAddress: boolean = false


  @Output() addressSave = new EventEmitter()

  @Output() onClose = new EventEmitter()
}
