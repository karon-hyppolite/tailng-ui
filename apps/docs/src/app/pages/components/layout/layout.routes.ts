import { Routes } from '@angular/router';

export const layoutRoutes: Routes = [
  {
    path: 'layout/accordion',
    loadComponent: () =>
      import('./accordion/accordion-docs.component').then(
        (m) => m.AccordionDocsComponent,
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
          import('./accordion/overview/accordion-overview.component').then(
            (m) => m.AccordionOverviewComponent,
          ),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./accordion/api/accordion-api.component').then(
            (m) => m.AccordionApiComponent,
          ),
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./accordion/styling/accordion-styling.component').then(
            (m) => m.AccordionStylingComponent,
          ),
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./accordion/examples/accordion-examples.component').then(
            (m) => m.AccordionExamplesComponent,
          ),
      },
    ],
    data: { title: 'Accordion – tailng', description: 'Accordion component for collapsible content.' },
  },
  {
    path: 'layout/card',
    loadComponent: () =>
      import('./card/card-docs.component').then((m) => m.CardDocsComponent),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./card/overview/card-overview.component').then(
            (m) => m.CardOverviewComponent,
          ),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./card/api/card-api.component').then((m) => m.CardApiComponent),
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./card/styling/card-styling.component').then(
            (m) => m.CardStylingComponent,
          ),
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./card/examples/card-examples.component').then(
            (m) => m.CardExamplesComponent,
          ),
      },
    ],
    data: { title: 'Card – tailng', description: 'Card component for layouts.' },
  },
  {
    path: 'layout/divider',
    loadComponent: () =>
      import('./divider/divider-docs.component').then((m) => m.DividerDocsComponent),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./divider/overview/divider-overview.component').then(
            (m) => m.DividerOverviewComponent,
          ),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./divider/api/divider-api.component').then((m) => m.DividerApiComponent),
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./divider/styling/divider-styling.component').then(
            (m) => m.DividerStylingComponent,
          ),
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./divider/examples/divider-examples.component').then(
            (m) => m.DividerExamplesComponent,
          ),
      },
    ],
    data: { title: 'Divider – tailng', description: 'Divider component for layouts.' },
  },
  {
    path: 'layout/expansion-panel',
    loadComponent: () =>
      import('./expansion-panel/expansion-panel-docs.component').then(
        (m) => m.ExpansionPanelDocsComponent,
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
          import('./expansion-panel/overview/expansion-panel-overview.component').then(
            (m) => m.ExpansionPanelOverviewComponent,
          ),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./expansion-panel/api/expansion-panel-api.component').then(
            (m) => m.ExpansionPanelApiComponent,
          ),
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./expansion-panel/styling/expansion-panel-styling.component').then(
            (m) => m.ExpansionPanelStylingComponent,
          ),
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./expansion-panel/examples/expansion-panel-examples.component').then(
            (m) => m.ExpansionPanelExamplesComponent,
          ),
      },
    ],
    data: { title: 'Expansion Panel – tailng', description: 'Expansion panel component.' },
  },
  {
    path: 'layout/tabs',
    loadComponent: () =>
      import('./tabs/tabs-docs.component').then((m) => m.TabsDocsComponent),
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./tabs/overview/tabs-overview.component').then(
            (m) => m.TabsOverviewComponent,
          ),
      },
      {
        path: 'api',
        loadComponent: () =>
          import('./tabs/api/tabs-api.component').then((m) => m.TabsApiComponent),
      },
      {
        path: 'styling',
        loadComponent: () =>
          import('./tabs/styling/tabs-styling.component').then(
            (m) => m.TabsStylingComponent,
          ),
      },
      {
        path: 'examples',
        loadComponent: () =>
          import('./tabs/examples/tabs-examples.component').then(
            (m) => m.TabsExamplesComponent,
          ),
      },
    ],
    data: { title: 'Tabs – tailng', description: 'Tabs component for switching views.' },
  },
];
