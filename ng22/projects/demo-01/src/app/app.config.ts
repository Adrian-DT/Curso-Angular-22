import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
// Importación para pasarle al PipeDate el locale español, para que muestre la fecha en español, en lugar de en inglés. Esto es necesario porque por defecto Angular utiliza el locale inglés, y si queremos mostrar la fecha en español, debemos importarlo y pasarlo al PipeDate.
import localeEs from '@angular/common/locales/es';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import { TimeOld } from './core/services/time';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// Registramos el locale español para que Angular lo utilice en toda la aplicación, y así poder mostrar la fecha en español, en lugar de en inglés. Esto es necesario porque por defecto Angular utiliza el locale inglés, y si queremos mostrar la fecha en español, debemos registrarlo.
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // Proveemos el servicio HttpClient de manera global, para poder hacer peticiones HTTP desde cualquier componente o servicio de la aplicación.
    // Esto es necesario porque por defecto Angular no provee el servicio HttpClient de manera global,
    // y si queremos hacer peticiones HTTP desde cualquier componente o servicio, debemos proveerlo de manera global.
    // Usando provideHttpClient() y withInterceptors([]) para poder añadir interceptores de manera global, que nos permitan
    // modificar las peticiones HTTP antes de enviarlas, o las respuestas HTTP antes de recibirlas.
    provideHttpClient(withInterceptors([])),
    // Indicamos que por defecto se utilice como valor local el español, de esta forma no es necesaria la importación del locale español en cada componente que utilice el PipeDate, y así poder mostrar la fecha en español, en lugar de en inglés. Esto es necesario porque por defecto Angular utiliza el locale inglés, y si queremos mostrar la fecha en español, debemos importarlo y pasarlo al PipeDate.
    {
      provide: LOCALE_ID,
      useValue: 'es-ES',
    },
    // Manera de proveer un servicio de manera global, en versiones antiguas de Angular
    TimeOld,
  ],
};
