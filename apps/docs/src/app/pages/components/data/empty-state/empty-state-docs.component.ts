import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { EmptyStateOverviewComponent } from './overview/overview.component';
import { EmptyStateApiComponent } from './api/api.component';
import { EmptyStateStylingComponent } from './styling/styling.component';
import { EmptyStateExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-empty-state',
  templateUrl: './empty-state-docs.component.html',
  imports: [
    ComponentShellComponent,
    EmptyStateOverviewComponent,
    EmptyStateApiComponent,
    EmptyStateStylingComponent,
    EmptyStateExamplesComponent,
  ],
})
export class EmptyStateDocsComponent {}
