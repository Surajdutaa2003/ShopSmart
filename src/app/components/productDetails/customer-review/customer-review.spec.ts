import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReview } from './customer-review';

describe('CustomerReview', () => {
  let component: CustomerReview;
  let fixture: ComponentFixture<CustomerReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
