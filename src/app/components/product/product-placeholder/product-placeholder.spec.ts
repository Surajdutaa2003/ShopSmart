import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPlaceholder } from './product-placeholder';

describe('ProductPlaceholder', () => {
  let component: ProductPlaceholder;
  let fixture: ComponentFixture<ProductPlaceholder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductPlaceholder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPlaceholder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
