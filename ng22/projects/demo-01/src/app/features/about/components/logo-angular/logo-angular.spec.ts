import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoAngular } from './logo-angular';

describe('LogoAngular', () => {
  let component: LogoAngular;
  let fixture: ComponentFixture<LogoAngular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoAngular],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoAngular);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
