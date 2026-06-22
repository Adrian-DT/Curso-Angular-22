import { ComponentFixture, TestBed } from '@angular/core/testing';

import { User } from './user';
import { By } from '@angular/platform-browser';

describe('User', () => {
  let component: User;
  let fixture: ComponentFixture<User>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [User],
    }).compileComponents();

    fixture = TestBed.createComponent(User);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle user', () => {
    vi.spyOn(console, 'log').mockImplementation(() => {
      // NOP
    });
    const buttonDebug = fixture.debugElement.query(By.css('#menu-icon'));
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(console.log).toHaveBeenCalledWith('User Login');
  });
});
