import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperProductInfoCard } from './wrapper-product-info-card';

describe('WrapperProductInfoCard', () => {
  let component: WrapperProductInfoCard;
  let fixture: ComponentFixture<WrapperProductInfoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrapperProductInfoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WrapperProductInfoCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
