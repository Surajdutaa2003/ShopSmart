import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoLink } from './logo-link';

describe('LogoLink', () => {
  let component: LogoLink;
  let fixture: ComponentFixture<LogoLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
