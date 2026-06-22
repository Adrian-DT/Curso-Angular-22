import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    fixture.componentRef.setInput('headerTitle', 'Test title');
    fixture.componentRef.setInput('subtitle', 'Test subtitle');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct title and subtitle', () => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const titleElement = debugElement.query(By.css('.title'));
    const subtitleElement = debugElement.query(By.css('.bottom-row p'));
    expect(titleElement.nativeElement.textContent).toBe('Test title');
    expect(subtitleElement.nativeElement.textContent).toBe(
      'Test subtitle',
    );
  });
});
