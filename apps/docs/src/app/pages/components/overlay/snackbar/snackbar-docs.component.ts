import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { SnackbarOverviewComponent } from './overview/overview.component';
import { SnackbarApiComponent } from './api/api.component';
import { SnackbarStylingComponent } from './styling/styling.component';
import { SnackbarExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-snackbar',
  templateUrl: './snackbar-docs.component.html',
  imports: [
    ComponentShellComponent,
    SnackbarOverviewComponent,
    SnackbarApiComponent,
    SnackbarStylingComponent,
    SnackbarExamplesComponent,
  ],
})
export class SnackbarDocsComponent {}
