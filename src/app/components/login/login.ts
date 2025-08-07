// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { AuthModule } from '../../features/auth/auth-module';
// @Component({
//   selector: 'app-login',
 
//   standalone: false,
// })
// export class Login {
//   loginForm: FormGroup;
//   errorMessage = '';

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthModule,
//     private router: Router
//   ) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });
//   }

//   onSubmit() {
//     if (this.loginForm.valid) {
//       const { email, password } = this.loginForm.value;
//       this.authService.login(email, password).subscribe({
//         next: () => {
//           this.router.navigate(['/home/products']);
//         },
//         error: (error) => {
//           this.errorMessage = error.message;
//         }
//       });
//     }
//   }
// }