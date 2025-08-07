import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { orderCheckoutGuard } from './order-checkout-guard';

describe('orderCheckoutGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => orderCheckoutGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
