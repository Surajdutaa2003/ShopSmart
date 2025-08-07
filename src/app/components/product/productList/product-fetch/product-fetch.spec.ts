import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFetch } from './product-fetch';

describe('ProductFetch', () => {
  let component: ProductFetch;
  let fixture: ComponentFixture<ProductFetch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFetch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFetch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
