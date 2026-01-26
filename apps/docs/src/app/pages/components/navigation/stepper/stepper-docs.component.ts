import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { StepperOverviewComponent } from './overview/overview.component';
import { StepperApiComponent } from './api/api.component';
import { StepperStylingComponent } from './styling/styling.component';
import { StepperExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-stepper',
  templateUrl: './stepper-docs.component.html',
  imports: [
    ComponentShellComponent,
    StepperOverviewComponent,
    StepperApiComponent,
    StepperStylingComponent,
    StepperExamplesComponent,
  ],
})
export class StepperDocsComponent {}
