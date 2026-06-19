import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Menu } from './menu';
import { MenuOption } from '../../types/menu-option';

const mockMenuOptions: MenuOption[] = [
  { label: 'Home', path: '/home' },
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
    // Seteamos los valores del menu
    fixture.componentRef.setInput('options', mockMenuOptions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct menu options', () => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement;
    const menuItems = debugElement.nativeElement.querySelectorAll('li');

    expect(menuItems.length).toBe(mockMenuOptions.length);

    menuItems.forEach((item: HTMLElement, index: number) => {
      const anchor = item.querySelector('a');
      expect(anchor?.textContent).toBe(mockMenuOptions[index].label);
      expect(anchor?.getAttribute('href')).toBe(mockMenuOptions[index].path);
    });
  });
});
