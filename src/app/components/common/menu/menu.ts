import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/auth.model';
import { UserService } from '../../../services/user/user';
import { ROUTES } from '../../../constant/route.constant';

@Component({
  selector: 'app-user-menu',
  standalone: false,
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class Menu implements OnInit {
  currentUser: User | null = null;
  isLoggedIn = false;
  routes = ROUTES;

  constructor(
    private authService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      
      if (isLoggedIn) {
        this.loadUserData();
      } else {
        this.currentUser = null;
      }
    });
  }

  loadUserData(): void {
    this.authService.getCurrentUser().subscribe({
      next: (userData) => {
        this.currentUser = userData;
      },
      error: (error) => {
        console.error('Error loading user data:', error);
      }
    });
  }

  viewOrders(): void {
    this.router.navigate([`/${ROUTES.home}/${ROUTES.order.parent}/${ROUTES.order.userOrder}`]);
  }

  logout(): void {
    this.authService.logout()
  }
}
