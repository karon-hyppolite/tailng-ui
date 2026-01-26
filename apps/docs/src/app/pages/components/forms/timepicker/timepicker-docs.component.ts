import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { TimepickerOverviewComponent } from './overview/overview.component';
import { TimepickerApiComponent } from './api/api.component';
import { TimepickerStylingComponent } from './styling/styling.component';
import { TimepickerExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-timepicker',
  templateUrl: './timepicker-docs.component.html',
  imports: [
    ComponentShellComponent,
    TimepickerOverviewComponent,
    TimepickerApiComponent,
    TimepickerStylingComponent,
    TimepickerExamplesComponent,
  ],
})
export class TimepickerDocsComponent {}
