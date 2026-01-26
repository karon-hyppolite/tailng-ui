import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { TreeOverviewComponent } from './overview/overview.component';
import { TreeApiComponent } from './api/api.component';
import { TreeStylingComponent } from './styling/styling.component';
import { TreeExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-tree',
  templateUrl: './tree-docs.component.html',
  imports: [
    ComponentShellComponent,
    TreeOverviewComponent,
    TreeApiComponent,
    TreeStylingComponent,
    TreeExamplesComponent,
  ],
})
export class TreeDocsComponent {}
