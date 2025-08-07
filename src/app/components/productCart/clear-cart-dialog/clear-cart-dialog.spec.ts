import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearCartDialog } from './clear-cart-dialog';

describe('ClearCartDialog', () => {
  let component: ClearCartDialog;
  let fixture: ComponentFixture<ClearCartDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClearCartDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClearCartDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
