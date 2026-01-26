import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { ProgressBarOverviewComponent } from './overview/overview.component';
import { ProgressBarApiComponent } from './api/api.component';
import { ProgressBarStylingComponent } from './styling/styling.component';
import { ProgressBarExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-progress-bar',
  templateUrl: './progress-bar-docs.component.html',
  imports: [
    ComponentShellComponent,
    ProgressBarOverviewComponent,
    ProgressBarApiComponent,
    ProgressBarStylingComponent,
    ProgressBarExamplesComponent,
  ],
})
export class ProgressBarDocsComponent {}
