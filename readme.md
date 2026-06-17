# Angular 22

- Nombre: Angular AF 75828 – GR 97831
- Duración: 35 horas
- Modalidad: On-line
- Fechas/Horario:
  - Días L-15, M-16, X-17, J-18, V-19 y L-22 Junio 2026
  - Horarios: 
    - Días 15, 16, 17 y 18 Junio en horario 08:30 – 14:30 hs.
    - Días 19 y 22 Junio en horario 9:00 – 14:30 hs.

- Instructor: Alejandro Cerezo Lasne <alce65@hotmail.es>

- Repositorio: https://github.com/IconoTC/Angular-20-AF-91550---Grupo-97836

Curso de Angular 22, versión publicada el 3 de Junio de 2026.

## Temario

- Introducción a Angular y preparación del entorno 
  - ¿Qué es Angular y qué resuelve? 
  - Angular: fundamentos clave 
  - Angular vs otros frameworks 
  - Preparar el entorno 
  - Crear el primer proyecto Angular 
- Componentes en profundidad 
  - Declaración de Componentes y Standalone Components
  - Comunicación entre componentes con @Input y @Output 
  - Ciclo de vida del componente 
  - Estilos: encapsulados y globales 
- Templates, directivas y pipes 
  - Binding de datos en plantillas 
  - Directivas estructurales
  - Directivas de atributo 
  - Pipes integrados 
  - Creación de pipes personalizados 
- Enrutamiento con provideRouter 
  - Fundamentos del routing en Angular 20 
  - Configuración de rutas con provideRouter y Route 
  - Navegación entre vistas 
  - Parámetros de ruta y query params 
  - Lazy loading moderno 
  - Guards básicos 
  - Caso práctico: aplicación de un restaurante 
- Servicios e inyección de dependencias
  - Introducción a los servicios 
  - Creación e inyección de servicios
  - Ámbito y ciclo de vida de servicios 
  - Comunicación HTTP con HttpClient 
  - Manejo básico de errores en peticiones HTTP 
  - Interceptors HTTP para manejo global de peticiones y errores 
  - Lazy services y carga perezosa de servicios 
- Formularios template-driven 
  - Estructura básica de formularios template-driven 
  - Binding y sincronización con ngModel 
  - Validaciones básicas en formularios template-driven 
  - Mostrar mensajes de error
  - Formularios anidados simples 
- Formularios reactivos 
  - Introducción a formularios reactivos 
  - Validaciones reactivas 
  - Manejo programático de errores 
  - Validadores personalizados 
  - Validación de formularios complejos 
- Signals y estado reactivo 
  - Introducción a Signals 
  - API básica de Signals 
  - Estado local reactivo sin necesidad de Observables 
  - Uso de Signals en templates Angular 
  - Diferencias entre Signals y RxJS
  - Integración y coexistencia entre Signals y RxJS
- Comunicación avanzada y manejo de estado 
  - Comunicación entre componentes hermanos 
  - Comparativa: EventEmitter vs Subject 
  - Patrones de arquitectura recomendados para manejo de estado
  - Uso básico de BehaviorSubject y Signals compartidos 
  - Introducción a estado compartido simple sin NgRx 
  - Conceptos de gestión de estado reactivo a mayor escala (sin librerías externas) 
- Testing de componentes y servicios 
  - Importancia de testear en Angular
  - Configuración del entorno de testing 
  - Pruebas de componentes 
  - Pruebas de servicios 
  - Pruebas de formularios 
  - Introducción a pruebas end-to-end (E2E) con Cypress o Playwright 
- Arquitectura escalable y buenas prácticas 
  - Organización por features (Feature Folders) 
  - Reutilización de componentes y servicios 
  - Nomenclatura, rutas y estructura limpia 
  - Introducción a NgModules 
  - Migración y coexistencia entre NgModules y Standalone Components
  - Migración y coexistencia entre NgModules y Standalone Components
  - Monorepos y herramientas para proyectos grandes (Nx) 
  - Buenas prácticas de seguridad en Angular 
- Despliegue y optimización para producción 
  - Variables de entorno 
  - Comandos de build para producción 
  - Técnicas de lazy loading para mejorar performance 
  - Opciones populares para despliegue 
  - Análisis de bundles y optimización avanzada (tree shaking, preloading) 
  - Monitorización post-despliegue y feedback de usuarios

## Desarrollo del curso

### Día 1 (L-15): Introducción a Typescript y Angular

- Introducción a Angular y su ecosistema.

- Entornos de desarrollo para Angular: 
  - Node: nvm (Node Version Manager)
  - Visual Studio Code
    - Extensiones recomendadas
- Instalación de Angular CLI.
- Workspace y proyectos en Angular.
  - Creación de un nuevo workspace Angular sin proyecto. `ng new`
  - Creación de un nuevo proyecto (app) Angular. `ng generate app`

[descanso]: 11:10 - 11:40

- Workspace y proyectos en Angular (2).

  - Añadiendo ESLint (`ng add`) y Prettier.
  - Estructura de un workspace/proyecto Angular.

- Angular CLI: Comandos básicos.
  - Servidor de desarrollo: `ng serve`.
  - Testing con Vitest: `ng test`.
  - Testing con Playwright: `ng e2e`.
    - Problemas de versiones. Actualización con Version Lens 
  - Construcción del proyecto: `ng build`.
  - Despliegue: `ng deploy`. Opciones
- Generación de componentes: `ng generate`.
  - Elementos de un componente: HTML, CSS, TypeScript. 
  - Template y estilos inline o en ficheros.
  - Guía de estilos actualizada
  - Scaffolding 
  - Estilos globales: variables, reset...
 

- Elementos básicos de TypeScript.
  - Tipos de datos. Inferencia y anotación de tipos.
  - Tipado de funciones.
  - Tipos personalizados. Interfaces y tipos.
  - Clases ES6 en TypeScript.
    - Modificadores de acceso.
    - Getters y Setters.
    - Herencia.
    - Clases abstractas.
  - Módulos ES6 en TypeScript.
    - Import y Export.
    - Módulos por defecto y nombrados.

### Día 2 (M-16): Componentes del Layout. Testing. 

 - Generación de componentes: `ng generate component <nombre>`.
    - Componente 🧿Sample
      - Programación declarativa en el template: 
        - Del componente a la vista: interpolación {{}}, binding de propiedades []
        - De la vista al componente: binding de eventos ()
      - Signals en el estado del componente y en la plantilla.
      - Signals y asincronía. Zoneless + Estrategia OnPush
  
      <!-- 
      - Estado en los componentes con ZoneJS v. Zoneless
        - Detección del cambio: Zone v. Zoneless
        - Detección del cambio: Estrategia OnPush
      -->
  
- Testing de componentes. Pruebas unitarias
  - Test con Vitest. Conceptos básicos y ejemplo
  - Elementos de los test en Angular: TestBed, fixture, detectChanges()
  - Test de implementación v. test de comportamiento.
  - Tests para componentes básicos.
    - Renderizado del componente (e.g. heading).
    - Interacción con el componente (e.g. click en un botón).
    - Procesos asíncronos. Timers

- [Descanso]: 11:00 - 11:30
 
- Estilos: Encapsulación de estilos. ViewEncapsulation.
 
- Scaffolding. Core
  - Componente 🧿Header. Estructura básica en CSS: Grid
  - Componente 🧿Footer
  - Componente 🧿Card. Proyección de contenido
  - Uso en el componente 🧿App como contenedor principal.
  - Test de Header, Footer y Card
  
- Componentes de navegación  
  - 🧿Menu. Tipo y datos. Iteración con @for
  - 🧿MenuMobile. Svg como parte del template
  - Incorporación en App: RWD basado en CSS y media queries
  - 🧿Socials. @for + @switch: iconos svg de las redes sociales

- Componentes gráficos
  - 🧿Separador. Componente de CSS
  - 🧿LogoCoders. Fichero svg como template

- Componente 🧿Search. Input de usuario: 2 way data binding. [(ngModel)]
- Referencias locales. #ref
  - Signal queries: viewChild, focus()
  - Ciclo de vida de los componentes


### Día 3 (X-17). Paginas. Componentes activos. Comunicaciones

- Referencias locales (continuación)
  - Effects (primitiva de signal) 
  - Componente 🧿SearchRef. Referencias locales en el template.  

- Testing de todos los componentes
  - Test de Search. Renderizado y data binding.

<!--
  - Test de Menu, MenuMobile y Socials. Renderizado y @for @switch
-->

- Componente 🧿user. Nuevo ejemplo de CSS
- Componente 🧿toggle: Widget css como componente Angular
- Test de Toggle. Spies & Mocks. 

- Scaffolding. Features
  - Componentes (pages): 🧿Home, 🧿Dashboard, 🧿About (Angular).
  - Ejercicio de componentization
    - 🧿Componentes incluidos en la demo de Angular

[Descanso]: 11:00 - 11:30

- Componentes activos.
  - Componente 🧿Counter. Estado y eventos (click)
  - Refactor Componente Counter. Condicionales @If. [class}

- Testing de todos los componentes
  - Test de Counter. Eventos. Errores al testear implementación

<!-- 
  - Test de las páginas
-->

- Comunicación entre componentes

  - Input. Decoradores @Input. función input(). Drilling
  - Output. Decorador @Output. EventEmitter. Función output(). Eventos del contador
  - 🧿CounterList. Agrupando contadores. Estado en el componente padre
  - Contadores. Eventos con valor. Computed signals 
 

### Día 4 (J-18). Rutas. Arquitectura de componentes. Formularios TD

<!-- 
- Comunicación entre componentes (continuación)
  - Intput en los contadores. Revision de los totales
  - Test de inputs y outputs. 
-->

<!-- Mitad del día 3 en versión anterior repartida en el día
¿Directivas y pipes antes de las rutas?
-->

<!-- 
- Rutas básicas. `app.routes.ts`
  - Array de rutas.
  - Array de opciones de menu
  - RouterOutlet en AppComponent.
  - Navegación. Componente menu. @for
  - SPA: RouterLink y RouterLinkActive
- Rutas Lazy. Default import en las páginas
 -->

<!-- 
 - 🧿Modal y menu mobile: Inputs + Outputs. Comunicación indirecta entre componentes
  (Podría ir después de rutas)
 -->

<!-- - Pipes. Location "es" -->

<!-- - ¿Directivas? -->


- [Descanso] - 11:05 - 11:35

<!-- 
- Arquitectura de componentes
  - Componentes de contenedores vs de presentación.
  - Componentes inteligentes vs tontos.

- Ejemplo: Tasks List
  - Entidad Tasks. Modelo y mock de datos asíncrono.
  - Componente Tasks-List. Lógica del estado
  - Componente Tasks-Item. Input y Output (Eventos)
  - Componente Tasks-Form. Output (Eventos) - Mock sin formulario
-->

### Día 5 (V-19).  Servicios. Providers e injectors. Formularios DD

<!-- Dia 4 en versión anterior -->

<!-- 
- Componente Tasks-Form. Output (Eventos)
  - Forms Template Driven (TD)
    - NgForm implícito, NgModel. Referencias locales
    - viewChild(NgForm) y form.reset()
    - viewChild(Form), ElementRef.nativeElement y acceso al DOM
  - Signal Forms

- Introducción a los servicios en Angular.
- Servicios y Providers. DI (Dependency Injection)
  - Provider root v. provider en un componente / ruta
  - Ejemplo con un servicio simple: Time
  - Injector jerárquico. Servicios singleton y no singleton.

- Solución de problemas en CSS con el grid RWD
-->

- [Descanso] 11:00 - 11:30

<!-- 
- Servicios y patrón Repository
  - Mock de datos. Interface de los repositorios
  - Uso de promesas y observables (RxJS) en los servicios.
  - Servicio LocalNotesRepository: Repositorio y persistencia local (localStorage).
  - Uso en los componentes. Inyección de dependencias.
  - Repositorio y lógica de negocio (estado). Estrategias 
  - Métodos CRUD. getAll() y getById()
  - Métodos CRUD. add(), update(), delete()

- RxJS (Observables)
  - Introducción. Observables, subscription, operadores.
  - Los mismos repositorios usando RxJS (Observables). 
  - Uso del repo en el componente
 -->

  <!-- - Testing de servicios.
    - Tests del servicio
      - Test de métodos CRUD.
      - Test de promesas (async, whenStable, expectAsync).
    - Testing de componentes con servicios (mocks y spies). -->

<!-- 
- Formularios reactivos (DD). RegisterForm
  - FormGroup, FormControl, FormBuilder
  - Binding desde el template 
 -->

### Día 6 (L-22). Servicios HTTP. Arquitectura ¿despliegue?

<!-- Dia 5 en versión anterior -->

<!-- 
- Formularios reactivos (continuación).

  - RegisterForm. Otros controles HTML
  - Validaciones síncronas (y asíncronas).
    - Mensajes de validación 
-->

<!-- - Testing de formularios reactivos. -->

<!-- 
- Introducción a los servicios HTTP en Angular.

- API server fake basado en JSONServer.
  - Prueba con Postman

- Instalación y uso de environments. 
  - Configuración de la URL base del API.

- Servicio HttpClientModule. Observables (RxJs).

  - Creación de un ApiRepositoryService.
  - Antes de Angular 21: Configuración del servicio HTTP: provider
  - Uso desde el componente (NoteList).  
 -->

<!--
- Servicio HttpClientModule. Observables (RxJs).
  - Tests de servicios HTTP con HttpTestingController
  - Test de componentes con servicios HTTP (mocks y spies).
-->

- [Descanso] 11:00 - 11:30
 
<!-- 
- Servicios stateful: patrón Flux

- Nuevo proyecto (demo-02). Feature Notes

  - Estado con RxJS: Subjects
    - Estado privado con BehaviorSubject
    - Estado público con Observable (asObservable)
    - Métodos para modificar el estado (add, toggle, remove)
  
  
  - Estado con Signals: signal (WriteableSignal) y readOnly/computed (Signal)
  
  - Servicio Store con NotesState
    - Estado privado con WriteableSignal
    - Estado público con Signal (asReadOnly)
    - Métodos para modificar el estado (add, toggle, remove)

- Uso del estado desde los componentes ToDo...
- Gestión de errores
- Uso desde cualquier parte de la aplicación (Header) 

- Más novedades (Signals)
  - resources: httResource (Angular 22)
  - linkedSignals
- Directivas propias
- Interceptors y Guards
- Testing
 -->