import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { CheckboxOverviewComponent } from './overview/overview.component';
import { CheckboxApiComponent } from './api/api.component';
import { CheckboxStylingComponent } from './styling/styling.component';
import { CheckboxExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-checkbox',
  templateUrl: './checkbox-docs.component.html',
  imports: [
    ComponentShellComponent,
    CheckboxOverviewComponent,
    CheckboxApiComponent,
    CheckboxStylingComponent,
    CheckboxExamplesComponent,
  ],
})
export class CheckboxDocsComponent {}
