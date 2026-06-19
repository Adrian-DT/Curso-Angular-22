import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
// Importación para pasarle al PipeDate el locale español, para que muestre la fecha en español, en lugar de en inglés. Esto es necesario porque por defecto Angular utiliza el locale inglés, y si queremos mostrar la fecha en español, debemos importarlo y pasarlo al PipeDate.
import localeEs from '@angular/common/locales/es';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import { TimeOld } from './core/services/time';
// Registramos el locale español para que Angular lo utilice en toda la aplicación, y así poder mostrar la fecha en español, en lugar de en inglés. Esto es necesario porque por defecto Angular utiliza el locale inglés, y si queremos mostrar la fecha en español, debemos registrarlo.
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes),
    // Indicamos que por defecto se utilice como valor local el español, de esta forma no es necesaria la importación del locale español en cada componente que utilice el PipeDate, y así poder mostrar la fecha en español, en lugar de en inglés. Esto es necesario porque por defecto Angular utiliza el locale inglés, y si queremos mostrar la fecha en español, debemos importarlo y pasarlo al PipeDate.
    {
      provide: LOCALE_ID,
      useValue: 'es-ES',
    },
    // Manera de proveer un servicio de manera global, en versiones antiguas de Angular
    TimeOld,
  ],
};
