import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { ExpansionPanelOverviewComponent } from './overview/overview.component';
import { ExpansionPanelApiComponent } from './api/api.component';
import { ExpansionPanelStylingComponent } from './styling/styling.component';
import { ExpansionPanelExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-expansion-panel',
  templateUrl: './expansion-panel-docs.component.html',
  imports: [
    ComponentShellComponent,
    ExpansionPanelOverviewComponent,
    ExpansionPanelApiComponent,
    ExpansionPanelStylingComponent,
    ExpansionPanelExamplesComponent,
  ],
})
export class ExpansionPanelDocsComponent {}
