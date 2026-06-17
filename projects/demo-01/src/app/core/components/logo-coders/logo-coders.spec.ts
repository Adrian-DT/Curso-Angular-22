import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoCoders } from './logo-coders';

describe('LogoCoders', () => {
  let component: LogoCoders;
  let fixture: ComponentFixture<LogoCoders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoCoders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoCoders);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should handle click event', () => {
    vi.spyOn(console, 'log');
    component.handleClick('testSource');
    expect(console.log).toHaveBeenCalledWith('LogoCoders clicked from:', 'testSource');
  });

});
