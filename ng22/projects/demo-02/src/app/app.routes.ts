import { Routes } from '@angular/router';
import { MenuOption } from './core/types/menu-option';
import { TimeOld } from './core/services/time';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    title: 'Home | Demo 02',
    data: {
      label: 'Inicio',
    },
    loadComponent: () => import('./features/home/home-page'),
  },
  {
    path: 'dashboard',
    title: 'Dashboard | Demo 02',
    data: {
      label: 'Dashboard',
    },
    loadComponent: () => import('./features/dashboard/dashboard-page'),
    providers: [TimeOld],
  },
  {
    path: 'notes',
    title: 'Notes | Demo 02',
    data: {
      label: 'Notas',
    },
    loadComponent: () => import('./features/notes/notes-page'),
    children: [
      {
        path: 'details/:id',
        title: 'Note Details | Demo 02',
        data: {
          label: 'Note Details',
        },
        loadComponent: () => import('./features/notes/notes-page'),
        // loadComponent: () => import('./features/notes/note-details-page'),
      },
    ],
  },
  {
    path: 'tasks',
    title: 'Tasks | Demo 02',
    data: {
      label: 'Tareas',
    },
    loadComponent: () => import('./features/tasks/tasks-page'),
  },
  {
    path: 'user',
    children: [
      {
        path: 'login',
        title: 'Users | Demo 02',
        loadComponent: () => import('./features/auth/login-page').then((m) => m.LoginPage),
      },
      {
        path: 'register',
        title: 'Users | Demo 02',
        loadComponent: () => import('./features/auth/register-page').then((m) => m.RegisterPage),
      },
    ],
  },
  {
    path: 'about',
    title: 'About | Demo 02',
    data: {
      label: 'About Angular',
    },
    loadComponent: () => import('./features/about/about-page'),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

export const getRoutes = (): MenuOption[] => {
  return routes
    .filter((route) => route.data?.['label'])
    .map((route) => ({
      label: route.data?.['label'] as string,
      path: route.path as string,
    }));
};
