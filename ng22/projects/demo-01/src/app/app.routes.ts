import { Routes } from '@angular/router';
import { MenuOption } from './core/types/menu-option';
// import { Time } from './core/services/time';

export const routes: Routes = [
  // Ruta siempre necesaria para redirigir a la página de inicio cuando se accede a la raíz del sitio
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    title: 'Home | Angular 22',
    data: {
      label: 'Inicio',
    },
    // Con loadComponent hacemos que los bloques de carga sean lazyload
    loadComponent: () => import('./features/home/home-page'),
  },
  {
    path: 'dashboard',
    title: 'Dashboard | Angular 22',
    data: {
      label: 'Dashboard',
    },
    loadComponent: () => import('./features/dashboard/dashboard-page'),
    // Podemos proveer un servicio a nivel de componente, para que sea inyectado en todos los componentes hijos, y así poder compartir el mismo servicio entre ellos,
    // tanto en la ruta como en el componente, y así poder compartir el mismo servicio entre ellos.
    // providers: [Time],
    // Con canActivate? utilizamos una guarda para comprobar permisos antes de cargar la ruta, en este caso, comprobamos si el usuario está logueado, y si no lo está, redirigimos a la página de inicio
  },
  {
    path: 'notes',
    title: 'Notes | Angular 22',
    data: {
      label: 'Notes',
    },
    loadComponent: () => import('./features/notes/notes-page'),
    // Al ser una ruta hija, si el componente padre, tiene un router-outlet, se cargaría ahí la página de la ruta hija, si no existe, se cargará en el
    // router-outlet del app que es el que está en la raíz de la aplicación
    children: [
      {
        path: 'details/:id',
        title: 'Detalles | Angular 22',
        data: {
          label: 'Detalles',
        },
        loadComponent: () => import('./features/notes/notes-page'),
      }
    ]
  },
  {
    path: 'tasks',
    title: 'Tasks | Angular 22',
    data: {
      label: 'Tasks',
    },
    loadComponent: () => import('./features/tasks/tasks-page'),
    // Al ser una ruta hija, si el componente padre, tiene un router-outlet, se cargaría ahí la página de la ruta hija, si no existe, se cargará en el
    // router-outlet del app que es el que está en la raíz de la aplicación
    children: [
      {
        path: 'details/:id',
        title: 'Detalles | Angular 22',
        data: {
          label: 'Detalles',
        },
        loadComponent: () => import('./features/tasks/tasks-page'),
      }
    ]
  },
  {
    path: 'users',
    children: [
      {
        path: 'login',
        title: 'Users | Angular 22',
        loadComponent: () => import('./features/auth/login-page/login-page').then((m) => m.default),
      },
      {
        path: 'register',
        title: 'Register | Angular 22',
        loadComponent: () => import('./features/auth/register-page/register-page').then((m) => m.default),
      },
    ]
  },
  {
    path: 'about',
    title: 'About | Angular 22',
    data: {
      label: 'About',
    },
    loadComponent: () => import('./features/about/about-page'),
  },
  // Ruta comodín para redirigir a la página de inicio cuando se accede a una ruta no definida
  {
    path: '**',
    redirectTo: 'home',
  }
];

// Constante que obtiene los datos de las rutas, la cual utilizamos en el componente de menu para generar el menú de navegación dinámicamente, en lugar de tener que definirlo manualmente. Esto nos permite mantener la consistencia entre las rutas y el menú, y facilita la adición o eliminación de rutas en el futuro.
// export const MENU_OPTIONS: MenuOption[] = routes
//   .filter((route) => route.data && route.data?.['label'])
//   .map((route) => ({
//     label: route.data?.['label'] as string,
//     data: route.data,
//     path: route.path as string,
//   }));

// Función para obtener las rutas, la cual utilizamos en el componente de menu para generar el menú de navegación dinámicamente, en lugar de tener que definirlo manualmente. Esto nos permite mantener la consistencia entre las rutas y el menú, y facilita la adición o eliminación de rutas en el futuro.
export const getRoutes: () => MenuOption[] = () => {
  return routes
    .filter((route) => route.data && route.data?.['label'])
    .map((route) => ({
      label: route.data?.['label'] as string,
      data: route.data,
      path: route.path as string,
    }));
};
