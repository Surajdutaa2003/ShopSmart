import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProducts } from './featured-products';

describe('FeaturedProducts', () => {
  let component: FeaturedProducts;
  let fixture: ComponentFixture<FeaturedProducts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeaturedProducts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedProducts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
