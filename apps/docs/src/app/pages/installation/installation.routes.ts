import { Routes } from '@angular/router';

export const installationRoutes: Routes = [
  {
    path: 'getting-started/installation',
    loadComponent: () =>
      import('./installation/installation.component').then((m) => m.InstallationComponent),
    data: { title: 'Installation – tailng', description: 'Install tailng and get started quickly.' },
  },
  {
    path: 'getting-started/tailwind-setup',
    loadComponent: () =>
      import('./tailwind-setup/tailwind-setup.component').then((m) => m.TailwindSetupComponent),
    data: { title: 'Tailwind Setup – tailng', description: 'Configure Tailwind for tailng.' },
  },
  {
    path: 'getting-started/quick-start',
    loadComponent: () =>
      import('./quick-start/quick-start.component').then((m) => m.QuickStartComponent),
    data: { title: 'Quick Start – tailng', description: 'Use tailng components in minutes.' },
  },
];
