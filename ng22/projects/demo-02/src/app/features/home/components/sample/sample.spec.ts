import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sample } from './sample';

describe('Sample', () => {
  let component: Sample;
  let fixture: ComponentFixture<Sample>;

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sample],
    }).compileComponents();
  });

  async function createComponent() {
    fixture = TestBed.createComponent(Sample);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  }

  it('should create with all its properties initialized', async () => {
    await createComponent();

    expect(component).toBeTruthy();

    // test de implementación (caja blanca)
    expect(component['title']()).toContain('Sample');
    expect(component['subtitle']).toBe('Hola, Angular 22');
    expect(component['logo']()).toBe('/favicon.ico');
    expect(component['description']()).toBe('Logo de Angular');
  });

  // Test de Funcionalidad (caja negra)

  it('should render title and subtitle', async () => {
    await createComponent();

    const element = fixture.nativeElement as HTMLElement;
    const pElements = element.querySelectorAll('p');
    expect(pElements.length).toBe(2);
    expect(pElements[0]?.textContent).toContain('Sample');
    expect(pElements[1]?.textContent).toContain('Hola, Angular 22');
  });

  it('should change title on button click', async () => {
    await createComponent();

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    // No es necesario llamar a detectChanges() si se usa signals,
    // pero se puede usar para forzar la actualización de la vista.
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('p')?.textContent).toContain('Sample modificado por botón');
  });

  it('should change title after 2 seconds', async () => {
    vi.useFakeTimers();
    await createComponent();

    // No es necesario llamar a detectChanges() si se usa signals,
    // pero se puede usar para forzar la actualización de la vista.
    vi.advanceTimersByTime(2100);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('p')?.textContent).toContain('Sample modificado');
  });

  it('should NOT change subtitle after 3 seconds', async () => {
    vi.useFakeTimers();
    await createComponent();

    // No es necesario llamar a detectChanges() si se usa signals,
    // pero se puede usar para forzar la actualización de la vista.
    vi.advanceTimersByTime(3100);
    fixture.detectChanges();

    expect(component['subtitle']).toBe('Hola, Angular 22 modificado');
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelectorAll('p')[1]?.textContent).not.toContain('modificado');
  });
});
