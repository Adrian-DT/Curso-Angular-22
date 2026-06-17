import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { By } from '@angular/platform-browser';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render', () => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;

    const titleElement = debugElement.query(By.css('.title'));
    const subtitleElement = debugElement.query(By.css('.bottom-row p'));
    // titleElement.triggerEventHandler('click', null)
    expect(titleElement.nativeElement.textContent).toBe('Curso de Angular 22');
    expect(subtitleElement.nativeElement.textContent).toBe('Aprende a desarrollar aplicaciones web con Angular');
  })
});
