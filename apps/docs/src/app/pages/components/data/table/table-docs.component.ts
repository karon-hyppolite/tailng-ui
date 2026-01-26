import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { TableOverviewComponent } from './overview/overview.component';
import { TableApiComponent } from './api/api.component';
import { TableStylingComponent } from './styling/styling.component';
import { TableExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-table',
  templateUrl: './table-docs.component.html',
  imports: [
    ComponentShellComponent,
    TableOverviewComponent,
    TableApiComponent,
    TableStylingComponent,
    TableExamplesComponent,
  ],
})
export class TableDocsComponent {}
