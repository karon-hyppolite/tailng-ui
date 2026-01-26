import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { DividerOverviewComponent } from './overview/overview.component';
import { DividerApiComponent } from './api/api.component';
import { DividerStylingComponent } from './styling/styling.component';
import { DividerExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-divider',
  templateUrl: './divider-docs.component.html',
  imports: [
    ComponentShellComponent,
    DividerOverviewComponent,
    DividerApiComponent,
    DividerStylingComponent,
    DividerExamplesComponent,
  ],
})
export class DividerDocsComponent {}
