import { Component } from '@angular/core';
import { ROUTES } from '../../../constant/route.constant';

@Component({
  selector: 'app-logo-link',
  standalone: false,
  templateUrl: './logo-link.html',
  styleUrl: './logo-link.css'
})
export class LogoLink {
  routes = ROUTES
}
