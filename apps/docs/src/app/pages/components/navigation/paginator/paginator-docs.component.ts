import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { PaginatorOverviewComponent } from './overview/overview.component';
import { PaginatorApiComponent } from './api/api.component';
import { PaginatorStylingComponent } from './styling/styling.component';
import { PaginatorExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-paginator',
  templateUrl: './paginator-docs.component.html',
  imports: [
    ComponentShellComponent,
    PaginatorOverviewComponent,
    PaginatorApiComponent,
    PaginatorStylingComponent,
    PaginatorExamplesComponent,
  ],
})
export class PaginatorDocsComponent {}
