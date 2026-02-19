import type { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/theme-playground-page.component').then(
        (module) => module.ThemePlaygroundPageComponent,
      ),
  },
];
