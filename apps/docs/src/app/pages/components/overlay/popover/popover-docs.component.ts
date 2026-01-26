import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { PopoverOverviewComponent } from './overview/overview.component';
import { PopoverApiComponent } from './api/api.component';
import { PopoverStylingComponent } from './styling/styling.component';
import { PopoverExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-popover',
  templateUrl: './popover-docs.component.html',
  imports: [
    ComponentShellComponent,
    PopoverOverviewComponent,
    PopoverApiComponent,
    PopoverStylingComponent,
    PopoverExamplesComponent,
  ],
})
export class PopoverDocsComponent {}
