import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { FormFieldOverviewComponent } from './overview/overview.component';
import { FormFieldApiComponent } from './api/api.component';
import { FormFieldStylingComponent } from './styling/styling.component';
import { FormFieldExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-form-field',
  templateUrl: './form-field-docs.component.html',
  imports: [
    ComponentShellComponent,
    FormFieldOverviewComponent,
    FormFieldApiComponent,
    FormFieldStylingComponent,
    FormFieldExamplesComponent,
  ],
})
export class FormFieldDocsComponent {}
