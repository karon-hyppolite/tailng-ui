import type { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page.component').then((module) => module.HomePageComponent),
  },
  {
    path: 'theme',
    loadComponent: () =>
      import('./pages/theme-playground-page.component').then(
        (module) => module.ThemePlaygroundPageComponent,
      ),
  },
  {
    path: 'button',
    loadComponent: () =>
      import('./pages/button-playground-page.component').then(
        (module) => module.ButtonPlaygroundPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
