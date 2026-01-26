import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { BreadcrumbsOverviewComponent } from './overview/overview.component';
import { BreadcrumbsApiComponent } from './api/api.component';
import { BreadcrumbsStylingComponent } from './styling/styling.component';
import { BreadcrumbsExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-breadcrumbs',
  templateUrl: './breadcrumbs-docs.component.html',
  imports: [
    ComponentShellComponent,
    BreadcrumbsOverviewComponent,
    BreadcrumbsApiComponent,
    BreadcrumbsStylingComponent,
    BreadcrumbsExamplesComponent,
  ],
})
export class BreadcrumbsDocsComponent {}
