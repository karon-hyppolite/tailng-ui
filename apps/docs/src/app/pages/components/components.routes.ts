import { Routes } from '@angular/router';
import { formsRoutes } from './forms/forms.routes';
import { buttonsRoutes } from './buttons/buttons.routes';
import { layoutRoutes } from './layout/layout.routes';
import { navigationRoutes } from './navigation/navigation.routes';
import { overlayRoutes } from './overlay/overlay.routes';
import { overlayPrimitivesRoutes } from './overlay-primitives/overlay-primitives.routes';
import { dataRoutes } from './data/data.routes';
import { utilitiesRoutes } from './utilities/utilities.routes';
import { installationRoutes } from '../installation/installation.routes';

export const componentsRoutes: Routes = [
  {
    path: 'components',
    loadComponent: () =>
      import('../../layout/docs-shell/docs-shell.component').then((m) => m.DocsShellComponent),
    children: [
      // /components (intro + left menu)
      {
        path: '',
        loadComponent: () =>
          import('./components-home/components-home.component').then(
            (m) => m.ComponentsHomeComponent,
          ),
        data: {
          title: 'Components – tailng',
          description: 'Browse tailng components, examples, and usage guidelines.',
        },
      },

      // Getting Started routes
      ...installationRoutes,

      // Import all category routes
      ...formsRoutes,
      ...buttonsRoutes,
      ...layoutRoutes,
      ...navigationRoutes,
      ...overlayRoutes,
      ...overlayPrimitivesRoutes,
      ...dataRoutes,
      ...utilitiesRoutes,
    ],
  },
];
