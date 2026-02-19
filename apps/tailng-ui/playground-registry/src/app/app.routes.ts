import type { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/registry-playground-page.component').then(
        (module) => module.RegistryPlaygroundPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
