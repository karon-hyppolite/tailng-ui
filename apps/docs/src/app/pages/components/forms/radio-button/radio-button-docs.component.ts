import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { RadioButtonOverviewComponent } from './overview/overview.component';
import { RadioButtonApiComponent } from './api/api.component';
import { RadioButtonStylingComponent } from './styling/styling.component';
import { RadioButtonExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-radio-button',
  templateUrl: './radio-button-docs.component.html',
  imports: [
    ComponentShellComponent,
    RadioButtonOverviewComponent,
    RadioButtonApiComponent,
    RadioButtonStylingComponent,
    RadioButtonExamplesComponent,
  ],
})
export class RadioButtonDocsComponent {}
