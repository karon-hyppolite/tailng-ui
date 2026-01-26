import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { ProgressSpinnerOverviewComponent } from './overview/overview.component';
import { ProgressSpinnerApiComponent } from './api/api.component';
import { ProgressSpinnerStylingComponent } from './styling/styling.component';
import { ProgressSpinnerExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-progress-spinner',
  templateUrl: './progress-spinner-docs.component.html',
  imports: [
    ComponentShellComponent,
    ProgressSpinnerOverviewComponent,
    ProgressSpinnerApiComponent,
    ProgressSpinnerStylingComponent,
    ProgressSpinnerExamplesComponent,
  ],
})
export class ProgressSpinnerDocsComponent {}
