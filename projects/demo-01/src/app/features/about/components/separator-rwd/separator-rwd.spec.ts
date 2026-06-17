import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparatorRwd } from './separator-rwd';

describe('SeparatorRwd', () => {
  let component: SeparatorRwd;
  let fixture: ComponentFixture<SeparatorRwd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeparatorRwd],
    }).compileComponents();

    fixture = TestBed.createComponent(SeparatorRwd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
