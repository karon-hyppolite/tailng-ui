import { Routes } from '@angular/router';

export const overlayRoutes: Routes = [
  {
    path: 'overlay/dialog',
    loadComponent: () =>
      import('./dialog/dialog-docs.component').then((m) => m.DialogDocsComponent),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./dialog/overview/dialog-overview.component').then((m) => m.DialogOverviewComponent),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./dialog/api/dialog-api.component').then((m) => m.DialogApiComponent),
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./dialog/styling/dialog-styling.component').then((m) => m.DialogStylingComponent),
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./dialog/examples/dialog-examples.component').then((m) => m.DialogExamplesComponent),
      },
    ],
    data: { title: 'Dialog – tailng', description: 'Dialog component for modal interactions.' },
  },
  {
    path: 'overlay/popover',
    loadComponent: () =>
      import('./popover/popover-docs.component').then((m) => m.PopoverDocsComponent),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./popover/overview/popover-overview.component').then((m) => m.PopoverOverviewComponent),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./popover/api/popover-api.component').then((m) => m.PopoverApiComponent),
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./popover/styling/popover-styling.component').then((m) => m.PopoverStylingComponent),
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./popover/examples/popover-examples.component').then((m) => m.PopoverExamplesComponent),
      },
    ],
    data: { title: 'Popover – tailng', description: 'Popover component for anchored overlays.' },
  },
  {
    path: 'overlay/snackbar',
    loadComponent: () =>
      import('./snackbar/snackbar-docs.component').then((m) => m.SnackbarDocsComponent),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./snackbar/overview/snackbar-overview.component').then((m) => m.SnackbarOverviewComponent),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./snackbar/api/snackbar-api.component').then((m) => m.SnackbarApiComponent),
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./snackbar/styling/snackbar-styling.component').then((m) => m.SnackbarStylingComponent),
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./snackbar/examples/snackbar-examples.component').then((m) => m.SnackbarExamplesComponent),
      },
    ],
    data: { title: 'Snackbar – tailng', description: 'Snackbar notifications for tailng.' },
  },
  {
    path: 'overlay/tooltip',
    loadComponent: () =>
      import('./tooltip/tooltip-docs.component').then((m) => m.TooltipDocsComponent),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./tooltip/overview/tooltip-overview.component').then((m) => m.TooltipOverviewComponent),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./tooltip/api/tooltip-api.component').then((m) => m.TooltipApiComponent),
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./tooltip/styling/tooltip-styling.component').then((m) => m.TooltipStylingComponent),
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./tooltip/examples/tooltip-examples.component').then((m) => m.TooltipExamplesComponent),
      },
    ],
    data: { title: 'Tooltip – tailng', description: 'Tooltip component for contextual hints.' },
  },
];
