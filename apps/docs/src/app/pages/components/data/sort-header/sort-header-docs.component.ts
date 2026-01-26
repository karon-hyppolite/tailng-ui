import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { SortHeaderOverviewComponent } from './overview/overview.component';
import { SortHeaderApiComponent } from './api/api.component';
import { SortHeaderStylingComponent } from './styling/styling.component';
import { SortHeaderExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-sort-header',
  templateUrl: './sort-header-docs.component.html',
  imports: [
    ComponentShellComponent,
    SortHeaderOverviewComponent,
    SortHeaderApiComponent,
    SortHeaderStylingComponent,
    SortHeaderExamplesComponent,
  ],
})
export class SortHeaderDocsComponent {}
