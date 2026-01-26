import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { FilterHeaderOverviewComponent } from './overview/overview.component';
import { FilterHeaderApiComponent } from './api/api.component';
import { FilterHeaderStylingComponent } from './styling/styling.component';
import { FilterHeaderExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-filter-header',
  templateUrl: './filter-header-docs.component.html',
  imports: [
    ComponentShellComponent,
    FilterHeaderOverviewComponent,
    FilterHeaderApiComponent,
    FilterHeaderStylingComponent,
    FilterHeaderExamplesComponent,
  ],
})
export class FilterHeaderDocsComponent {}
