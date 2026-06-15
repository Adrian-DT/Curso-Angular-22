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

<!-- - Introducción a Angular y su ecosistema.

- Entornos de desarrollo para Angular: 
  - Node: nvm (Node Version Manager)
    - Problemas de instalación
  - Visual Studio Code
    - Extensiones recomendadas
- Instalación de Angular CLI.
- Workspace y proyectos en Angular.
  - Creación de un nuevo workspace Angular sin proyecto. `ng new`
  - Creación de un nuevo proyecto (app) Angular. `ng generate app`
  - Estructura de un workspace/proyecto Angular.
  - Añadiendo ESLint (`ng add`) y Prettier. -->

[descanso]: 11:00 - 11:30


<!--
- Angular CLI: Comandos básicos.
  - Servidor de desarrollo: `ng serve`.
  - Testing con Vitest: `ng test`.
  - Testing con Playwright: `ng e2e`.
    - Problemas de versiones. Actualización con Version Lens 
  - Construcción del proyecto: `ng build`.
- Generación de componentes: `ng generate`.
  - Elementos de un componente: HTML, CSS, TypeScript. 
  - Template y estilos inline o en ficheros.
  - Guía de estilos actualizada
  - Scaffolding -->

<!-- 
- Elementos básicos de TypeScript.
  - Tipos de datos. Inferencia y anotación de tipos.
  - Tipado de funciones.
  - Tipos personalizados. Interfaces y tipos.
 -->

### Día 2 (M-16): Componentes y Rutas

<!-- 
- Elementos básicos de TypeScript (continuación).

  - Clases ES6 en TypeScript.
    - Modificadores de acceso.
    - Getters y Setters.
    - Herencia.
    - Clases abstractas.
  - Módulos ES6 en TypeScript.
    - Import y Export.
    - Módulos por defecto y nombrados.

 - Generación de componentes: `ng generate component <nombre>`.
    - Programación declarativa en el template: {{}}, [], ()
    - Estilos: Encapsulación de estilos. ViewEncapsulation.
    - Signals en el estado del componente y en la plantilla.
  
- Testing de componentes. Pruebas unitarias

  - Test con Vitest. Conceptos básicos y ejemplo
  - Elementos de los test en Angular: TestBed, fixture, detectChanges()
  - Test de implementación v. test de comportamiento.
  - Tests para componentes básicos.
    - Renderizado del componente (e.g. heading).
    - Interacción con el componente (e.g. click en un botón).
 -->

- [Descanso]: 11:00 - 11:30
 
<!--  
- Scaffolding. Core
  - Componentes Header y Footer.
  - Componente Menu. Proyección de contenido
  - Componentes Card. Aspecto visual básico.
  - App como contenedor principal.


- Scaffolding. Features
  - Componentes (pages): Home, About.

- Componentes.
  - Componente Counter. Eventos. (click)
    - Condicionales @If. [class]
  - Componente Search. Input de usuario: data binding. [(ngModel)]
- Referencias locales. #ref
  - Componente SearchRef. Referencias locales en el template.  
-->

<!--
- Testing de todos los componentes
  - Test de Header, Footer, Menu, Card y Layout.  
  - Test de las páginas
  - Test de Counter. Renderizado y eventos.
  - Test de Search. Renderizado y data binding.
-->

<!-- 
- Componentes: estado. Zone v. Zoneless
- Estado en los componentes con ZoneJS.
  - Componente Counter. Estado y eventos.
  - Detección del cambio: Zone v. Zoneless
  - Signals y estado
  - Zoneless y asincronía: uso de Signals
-->

### Día 3 (X-17). Comunicaciones y Arquitectura de componentes. Formularios TD

<!-- 
- Review doble data binding & #ref
  - Signal queries: viewChild
  - Ciclo de vida de los componentes
  - Effects (primitiva de signal)
- Modificamos Menu. @for

- Rutas básicas. `app.routes.ts`
  - Array de rutas.
  - Array de opciones de menu
  - RouterOutlet en AppComponent.
  - Navegación. Componente menu. @for
  - SPA: RouterLink y RouterLinkActive
- Rutas Lazy. Default import en las páginas
 -->

[Descanso]: 11:00 - 11:30

<!-- 
- Comunicación entre componentes

  - Input. Decoradores @Input. función input(). Drilling
  - Output. Decorador @Output. EventEmitter. Función output(). Eventos del contador
  - Agrupando contadores. Estado en el componente padre
  - Contadores. Eventos con valor. Computed signals 
  
- Pipes. Location "es"

- Arquitectura de componentes
  - Componentes de contenedores vs de presentación.
  - Componentes inteligentes vs tontos.

- Ejemplo: Tasks List
  - Entidad Tasks. Modelo y mock de datos asíncrono.
  - Componente Tasks-List. Lógica del estado
  - Componente Tasks-Item. Input y Output (Eventos)
  - Componente Tasks-Form. Output (Eventos) - Mock sin formulario
 -->

### Día 4 (J-18). Servicios. Providers e injectors. Formularios DD

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

- [Descanso] - 11:05 - 11:35

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

### Día 5 (V-19). Servicios HTTP

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

### Día 6 (L-22). Arquitectura, optimización y despliegue

- [Descanso] 11:00 - 11:30