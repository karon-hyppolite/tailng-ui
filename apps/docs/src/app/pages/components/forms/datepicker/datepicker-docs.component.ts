import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { DatepickerOverviewComponent } from './overview/overview.component';
import { DatepickerApiComponent } from './api/api.component';
import { DatepickerStylingComponent } from './styling/styling.component';
import { DatepickerExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-datepicker',
  templateUrl: './datepicker-docs.component.html',
  imports: [
    ComponentShellComponent,
    DatepickerOverviewComponent,
    DatepickerApiComponent,
    DatepickerStylingComponent,
    DatepickerExamplesComponent,
  ],
})
export class DatepickerDocsComponent {}
