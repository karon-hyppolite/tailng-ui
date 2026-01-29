import { Routes } from '@angular/router';
import { homeRoutes } from './routes/home.routes';
import { componentsRoutes } from './routes/components.routes';

export const routes: Routes = [
  ...homeRoutes,
  ...componentsRoutes,
  { path: '**', redirectTo: '' },
];
