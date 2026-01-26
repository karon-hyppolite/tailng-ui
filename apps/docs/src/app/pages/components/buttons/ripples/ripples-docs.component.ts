import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { RipplesOverviewComponent } from './overview/overview.component';
import { RipplesApiComponent } from './api/api.component';
import { RipplesStylingComponent } from './styling/styling.component';
import { RipplesExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-ripples',
  templateUrl: './ripples-docs.component.html',
  imports: [
    ComponentShellComponent,
    RipplesOverviewComponent,
    RipplesApiComponent,
    RipplesStylingComponent,
    RipplesExamplesComponent,
  ],
})
export class RipplesDocsComponent {}
