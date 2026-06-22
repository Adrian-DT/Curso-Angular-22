import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Menu } from './menu';
import { MenuOption } from '../../types/menu-option';

const mockOptions: MenuOption[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

describe('Menu', () => {
  let component: Menu;
  let fixture: ComponentFixture<Menu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
    }).compileComponents();

    fixture = TestBed.createComponent(Menu);
    fixture.componentRef.setInput('options', mockOptions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the correct number of menu options', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const menuItems = compiled.querySelectorAll('li');
    expect(menuItems.length).toBe(mockOptions.length);
  });

  it('should render the correct labels and paths for menu options', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const menuItems = compiled.querySelectorAll('li');

    menuItems.forEach((item, index) => {
      const anchor = item.querySelector('a') as HTMLAnchorElement;
      expect(anchor.textContent).toBe(mockOptions[index].label);
      expect(anchor.getAttribute('href')).toBe(mockOptions[index].path);
    });
  });
});
