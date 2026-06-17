import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sample } from './sample';

describe('Sample', () => {
  let component: Sample;
  let fixture: ComponentFixture<Sample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sample],
    }).compileComponents();

    fixture = TestBed.createComponent(Sample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test de Funcionalidad o comportamiento / caja negra

  // Test para comprobar que un parrafo contiene un texto concreto mediante su selector
  it('should render title and subtitle', async () => {
    const element = fixture.nativeElement as HTMLElement;
    const pElement = element.querySelectorAll('p');
    // expect((pElement.length).toBe(2));
    expect(pElement[0]?.textContent).toContain('Sample');
    expect(pElement[1]?.textContent).toContain('Hola, Angular 22');
  });

  // Test para comprobar que el parrafo del subtitulo contiene un texto concreto mediante su selector
  // it('should render subtitle', async () => {
  //   const element = fixture.nativeElement as HTMLElement;
  //   expect(element.querySelectorAll('p')[1]?.textContent).toContain('Hola, Angular 22');
  // });

  // Test para comprobar que el parrafo del titulo cambia al pulsar el botón
  it('should change title on button click', async () => {
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('p')?.textContent).toContain('Sample modificado mediante el botón.');
  });

  // Test para comprobar que después del setTimeout se modifica el parrafo, no es buena práctica esperar con timeout
  // hay una mejor práctica que simula la espera, sin realizarla realmente.
  it.skip('should change title after 2 seconds', async () => {
    await new Promise((resolve) => setTimeout(resolve, 2100));
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('p')?.textContent).toContain('Sample modificado.');
  });

  // Aadiendo el it.todo indicamos que el test esta realizandose, por lo que no está activo
  // Con it.skip le decimos que se salte este test de la suite
  // Con it.only indicamos que solo queremos que se pase este test de la suite
  // Podemos simular la espera con useFakeTimers para no realizar la espera real
  it.todo('should change title after 2 seconds with fakeTimers', async () => {
    vi.useFakeTimers();
    // await createComponent();
    vi.advanceTimersByTime(2100);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('p')?.textContent).toContain('Sample modificado.');
  });


  // Test de implementación (caja blanca), comprobación de componentes
  it('should create with all properties initialized', async () => {
    expect(component).toBeTruthy();
    expect(component['title']()).toContain('Sample');
    expect(component['subtitle']).toBe('Hola, Angular 22');
    expect(component['logo']()).toBe('/favicon.ico');
    expect(component['descripcionLogo']()).toBe('Logo de Angular');
  });

});
