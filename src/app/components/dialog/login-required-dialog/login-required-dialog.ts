import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-required-dialog',
  standalone: false,
  templateUrl: './login-required-dialog.html',
  styleUrls: ['./login-required-dialog.css']
})
export class LoginRequiredDialog {
  constructor(public dialogRef: MatDialogRef<LoginRequiredDialog>) {}
}
