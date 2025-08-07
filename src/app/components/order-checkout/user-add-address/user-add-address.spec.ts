import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddAddress } from './user-add-address';

describe('UserAddAddress', () => {
  let component: UserAddAddress;
  let fixture: ComponentFixture<UserAddAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAddAddress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAddAddress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
