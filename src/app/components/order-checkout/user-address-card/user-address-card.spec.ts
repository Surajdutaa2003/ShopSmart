import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddressCard } from './user-address-card';

describe('UserAddressCard', () => {
  let component: UserAddressCard;
  let fixture: ComponentFixture<UserAddressCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAddressCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddressCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
