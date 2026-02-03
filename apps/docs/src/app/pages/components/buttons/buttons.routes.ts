import { Routes } from '@angular/router';

export const buttonsRoutes: Routes = [
  {
    path: 'buttons/badge',
    loadComponent: () =>
      import('./badge/badge-docs.component').then((m) => m.BadgeDocsComponent),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./badge/overview/badge-overview.component').then(
            (m) => m.BadgeOverviewComponent,
          ),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./badge/api/badge-api.component').then((m) => m.BadgeApiComponent),
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./badge/styling/badge-styling.component').then(
            (m) => m.BadgeStylingComponent,
          ),
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./badge/examples/badge-examples.component').then(
            (m) => m.BadgeExamplesComponent,
          ),
      },
    ],
    data: { title: 'Badge – tailng', description: 'Badge component for tailng.' },
  },
  {
    path: 'buttons/tag',
    loadComponent: () =>
      import('./tag/tag-docs.component').then((m) => m.TagDocsComponent),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./tag/overview/tag-overview.component').then(
            (m) => m.TagOverviewComponent,
          ),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./tag/api/tag-api.component').then((m) => m.TagApiComponent),
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./tag/styling/tag-styling.component').then(
            (m) => m.TagStylingComponent,
          ),
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./tag/examples/tag-examples.component').then(
            (m) => m.TagExamplesComponent,
          ),
      },
    ],
    data: { title: 'Tag – tailng', description: 'Tag component for labels and status indicators.' },
  },
  {
    path: 'buttons/button',
    loadComponent: () =>
      import('./button/button-docs.component').then((m) => m.ButtonDocsComponent),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./button/overview/button-overview.component').then(
            (m) => m.ButtonOverviewComponent,
          ),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./button/api/button-api.component').then((m) => m.ButtonApiComponent),
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./button/styling/button-styling.component').then(
            (m) => m.ButtonStylingComponent,
          ),
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./button/examples/button-examples.component').then(
            (m) => m.ButtonExamplesComponent,
          ),
      },
    ],
    data: { title: 'Button – tailng', description: 'Button component: variants, sizes, loading, icons.' },
  },
  {
    path: 'buttons/icon',
    loadComponent: () =>
      import('./icon/icon-docs.component').then((m) => m.IconDocsComponent),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./icon/overview/icon-overview.component').then(
            (m) => m.IconOverviewComponent,
          ),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./icon/api/icon-api.component').then((m) => m.IconApiComponent),
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./icon/styling/icon-styling.component').then(
            (m) => m.IconStylingComponent,
          ),
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./icon/examples/icon-examples.component').then(
            (m) => m.IconExamplesComponent,
          ),
      },
    ],
    data: { title: 'Icon – tailng', description: 'Icon component for tailng.' },
  },
  {
    path: 'buttons/ripples',
    loadComponent: () =>
      import('./ripples/ripples-docs.component').then((m) => m.RipplesDocsComponent),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./ripples/overview/ripples-overview.component').then(
            (m) => m.RipplesOverviewComponent,
          ),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./ripples/api/ripples-api.component').then((m) => m.RipplesApiComponent),
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./ripples/styling/ripples-styling.component').then(
            (m) => m.RipplesStylingComponent,
          ),
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./ripples/examples/ripples-examples.component').then(
            (m) => m.RipplesExamplesComponent,
          ),
      },
    ],
    data: { title: 'Ripples – tailng', description: 'Ripple effect for tailng components.' },
  },
  {
    path: 'buttons/progress-bar',
    loadComponent: () =>
      import('./progress-bar/progress-bar-docs.component').then(
        (m) => m.ProgressBarDocsComponent,
      ),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./progress-bar/overview/progress-bar-overview.component').then(
            (m) => m.ProgressBarOverviewComponent,
          ),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./progress-bar/api/progress-bar-api.component').then(
            (m) => m.ProgressBarApiComponent,
          ),
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./progress-bar/styling/progress-bar-styling.component').then(
            (m) => m.ProgressBarStylingComponent,
          ),
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./progress-bar/examples/progress-bar-examples.component').then(
            (m) => m.ProgressBarExamplesComponent,
          ),
      },
    ],
    data: { title: 'Progress Bar – tailng', description: 'Progress bar indicator for tailng.' },
  },
  {
    path: 'buttons/progress-spinner',
    loadComponent: () =>
      import('./progress-spinner/progress-spinner-docs.component').then(
        (m) => m.ProgressSpinnerDocsComponent,
      ),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./progress-spinner/overview/progress-spinner-overview.component').then(
            (m) => m.ProgressSpinnerOverviewComponent,
          ),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./progress-spinner/api/progress-spinner-api.component').then(
            (m) => m.ProgressSpinnerApiComponent,
          ),
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./progress-spinner/styling/progress-spinner-styling.component').then(
            (m) => m.ProgressSpinnerStylingComponent,
          ),
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./progress-spinner/examples/progress-spinner-examples.component').then(
            (m) => m.ProgressSpinnerExamplesComponent,
          ),
      },
    ],
    data: { title: 'Progress Spinner – tailng', description: 'Progress spinner indicator for tailng.' },
  },
  {
    path: 'buttons/skeleton',
    loadComponent: () =>
      import('./skeleton/skeleton-docs.component').then((m) => m.SkeletonDocsComponent),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./skeleton/overview/skeleton-overview.component').then(
            (m) => m.SkeletonOverviewComponent,
          ),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./skeleton/api/skeleton-api.component').then((m) => m.SkeletonApiComponent),
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./skeleton/styling/skeleton-styling.component').then(
            (m) => m.SkeletonStylingComponent,
          ),
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./skeleton/examples/skeleton-examples.component').then(
            (m) => m.SkeletonExamplesComponent,
          ),
      },
    ],
    data: { title: 'Skeleton – tailng', description: 'Skeleton loading placeholder for tailng.' },
  },
];
