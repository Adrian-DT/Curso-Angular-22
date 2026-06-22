import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoNg } from './logo-ng';

describe('LogoNg', () => {
  let component: LogoNg;
  let fixture: ComponentFixture<LogoNg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoNg],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoNg);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
