import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ROUTES } from '../../constant/route.constant';
import { SharedModule } from '../../components/shared-module';

const routes: Routes = [
  { path: ROUTES.auth.login, component: Login },
  { path: ROUTES.auth.register, component: Signup },
]

@NgModule({
  declarations: [
    Login,
    Signup
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule

  ],
  exports: [
    Login,
    Signup
  ]
})
export class AuthModule { }
