import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { TooltipOverviewComponent } from './overview/overview.component';
import { TooltipApiComponent } from './api/api.component';
import { TooltipStylingComponent } from './styling/styling.component';
import { TooltipExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-tooltip',
  templateUrl: './tooltip-docs.component.html',
  imports: [
    ComponentShellComponent,
    TooltipOverviewComponent,
    TooltipApiComponent,
    TooltipStylingComponent,
    TooltipExamplesComponent,
  ],
})
export class TooltipDocsComponent {}
