import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-snackbar',
  standalone: false,
  templateUrl: './snackbar.html',
  styleUrls: ['./snackbar.css']
})
export class Snackbar {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { 
      message: string; 
      product: Product 
    },
    public snackBarRef: MatSnackBarRef<Snackbar>
  ) {}

  closeSnackbar(): void {
    this.snackBarRef.dismiss();
  }
}
