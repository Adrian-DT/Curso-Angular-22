import { Component, inject, input, signal } from '@angular/core';
import { MenuMobile } from '../menu-mobile/menu-mobile';
import { Separator } from '../separator/separator';
import { LogoCoders } from '../logo-coders/logo-coders';
import { Search } from '../search/search';
import { User } from '../user/user';
import { Toggle } from '../toggle/toggle';
import { SearchRef } from '../search/search.ref';
import { TasksStoreRx } from '../../../features/tasks/services/tasks-store-rx';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'ind-header',
  imports: [MenuMobile, Separator, LogoCoders, Search, SearchRef, User, Toggle, AsyncPipe],
  template: `
    <!-- Podemos declarar variables en la vista utilizando la sintaxis @let, que nos permite crear una variable local que puede
    ser utilizada dentro del bloque de código donde se declara. En este caso, estamos declarando la variable tasks y asignándole el valor
    del Observable tasks$ del store, utilizando el AsyncPipe para suscribirnos automáticamente al Observable y obtener su valor actual. -->
    @let tasks = taskStore.tasks$ | async;
    <header>
      <div class="left-side">
        <ind-logo-coders />
      </div>
      <hgroup>
        <h1 class="title">{{ title() }}</h1>
      </hgroup>
      <div class="right-side">
        <div class="icons">
          <ind-menu-mobile class="mobile-only" />
          <ind-user />
        </div>
        <ind-toggle />
        <!-- Indicamos el número de tareas obtenidas mediante el back, injectado en el componente y utilizando el AsyncPipe para no necesitar subscribirme en el componente,
        lo obtenemos de la variable tasks definida en la parte de la vista más arriba -->
        <p>Tasks: {{ tasks?.length || 0 }}</p>
      </div>
      <div class="bottom-row">
        <p>{{ subtitle() }}</p>
        <ind-search class="mobile-only" />
        <div class="desktop-only">
          <ng-content></ng-content>
          <ind-search-ref />
        </div>
      </div>
    </header>
    <ind-separator />
  `,
  styles: [
    `
      :host {
        margin-bottom: 1.5rem;
        min-height: 15vh;
        color: var(--color-primary-hot);
        background-color: var(--color-background-primary);
      }

      header {
        padding: 1rem 2rem;
        display: grid;
        grid-template-columns: minmax(auto, max-content) 1fr minmax(auto, max-content);
        justify-items: center;
        align-items: center;
        text-align: center;
      }

      .left-side {
        min-width: 5rem;
      }

      hgroup {
        max-width: 15rem;
        h1 {
          color: var(--color-primary);
          font-family: var(--font-family-heading);
          font-optical-sizing: auto;
          font-size: 3.125rem;
          font-weight: 500;
          line-height: 100%;
          letter-spacing: -0.125rem;
          margin: 0;
        }
      }

      .right-side {
        min-width: 5rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.5rem;

        .icons {
          display: flex;
          gap: 1rem;
        }
      }

      .bottom-row {
        grid-column: span 3;
        margin-top: 0.6rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .desktop-only {
          display: none;
        }
      }
    `,
    `
      /*
        @media screen and (min-width: 900px) {
        */
      @media (width > 800px) {
        hgroup {
          max-width: none;
        }

        ind-menu-mobile,
        .mobile-only {
          display: none;
        }
        .bottom-row {
          width: 100%;
          display: block;
          .desktop-only {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            margin-top: 1rem;
          }
        }
      }
    `,
  ],
})
export class Header {
  readonly taskStore = inject(TasksStoreRx);

  readonly tasksLength = signal(0);

  readonly title = input.required<string>({
    // eslint-disable-next-line @angular-eslint/no-input-rename
    alias: 'headerTitle',
  });
  readonly subtitle = input<string>();

  constructor() {
    // Nos suscribimos al Observable tasks$ del store para recibir actualizaciones en tiempo real del número de tareas.
    this.taskStore.tasks$.subscribe({
      next: (tasks) => {
        this.tasksLength.set(tasks.length);
      },
    });
  }
}
