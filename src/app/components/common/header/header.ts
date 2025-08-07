import { Component } from '@angular/core';
import { Cart } from '../../../services/cart/cart';
import { Search } from '../../../services/search/search';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../../../services/user/user';
import { ROUTES } from '../../../constant/route.constant';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  cartItems: number = 0
  searchQuery: string = ''
  currentUrl: string = ''
  endpoint: string = ''

  routes = ROUTES

  isLoggedIn: boolean = false

  constructor(private cartService: Cart, private search: Search, private authService: UserService, private route: Router) {
    this.cartService.cart$.subscribe((cart) => {
      this.cartItems = cart.reduce((acc, curr) => (
        acc + Number(curr.quantity)
      ), 0)
    })

    this.search.searchQuery$.subscribe((data) => {
      this.searchQuery = data
    })

    this.authService.isLoggedIn$.subscribe((data) => {
      this.isLoggedIn = data
    })

    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects
        this.endpoint = this.currentUrl.split('/').filter(Boolean).pop() || ''
      }
    })

    this.currentUrl = this.route.url
    this.endpoint = this.currentUrl.split('/').filter(Boolean).pop() || '';
  }

  onSearchQueryChange(event: Event) {
    const searchQuery = (event?.target as HTMLInputElement).value
    this.search.updateSearchQuery(searchQuery)
  }

  navigateToLogin(){
    this.route.navigate([`${this.routes.auth.parent}/${this.routes.auth.login}`])
  }

  navigateToSignup(){
    this.route.navigate([`${this.routes.auth.parent}/${this.routes.auth.register}`])
  }

}
