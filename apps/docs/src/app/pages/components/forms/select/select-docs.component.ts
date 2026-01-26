import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { SelectOverviewComponent } from './overview/overview.component';
import { SelectApiComponent } from './api/api.component';
import { SelectStylingComponent } from './styling/styling.component';
import { SelectExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-select',
  templateUrl: './select-docs.component.html',
  imports: [
    ComponentShellComponent,
    SelectOverviewComponent,
    SelectApiComponent,
    SelectStylingComponent,
    SelectExamplesComponent,
  ],
})
export class SelectDocsComponent {}
