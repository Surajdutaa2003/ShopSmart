import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Cart } from '../../services/cart/cart';

export const orderPlacedGuard: CanActivateFn = (route, state) => {
  const orderPlaced = inject(Cart)
  const router = inject(Router)

  if(orderPlaced.isOrderJustPlaced()){
    return true
  }

  router.navigate(['/home'])
  return false
};
