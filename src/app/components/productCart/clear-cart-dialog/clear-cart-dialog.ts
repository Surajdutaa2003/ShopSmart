import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-clear-cart-dialog',
  standalone: false,
  templateUrl: './clear-cart-dialog.html',
  styleUrls: ['./clear-cart-dialog.css']
})
export class ClearCartDialog {
  constructor(public dialogRef: MatDialogRef<ClearCartDialog>) {}

  onCancel(): void {
    this.dialogRef.close('cancel');
  }

  onConfirm(): void {
    this.dialogRef.close('confirm');
  }
}
