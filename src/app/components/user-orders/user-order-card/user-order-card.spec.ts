import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderCard } from './user-order-card';

describe('UserOrderCard', () => {
  let component: UserOrderCard;
  let fixture: ComponentFixture<UserOrderCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserOrderCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrderCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
