import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user/user';
import { ROUTES } from '../../../constant/route.constant';
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  standalone: false,
})
export class Login {
  loginForm: FormGroup;
  errorMessage = '';

  routes = ROUTES

  returnUrl: string = `${this.routes.home}/${this.routes.product.parent}`

  constructor(
    private fb: FormBuilder,
    private authService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || `${this.routes.home}/${this.routes.product.parent}`
    })

  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigateByUrl(this.returnUrl);
        },
        error: (error) => {
          this.errorMessage = error.message;
        }
      });
    }
  }
}