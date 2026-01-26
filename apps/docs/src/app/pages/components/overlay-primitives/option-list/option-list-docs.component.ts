import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { OptionListOverviewComponent } from './overview/overview.component';
import { OptionListApiComponent } from './api/api.component';
import { OptionListStylingComponent } from './styling/styling.component';
import { OptionListExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-option-list',
  templateUrl: './option-list-docs.component.html',
  imports: [
    ComponentShellComponent,
    OptionListOverviewComponent,
    OptionListApiComponent,
    OptionListStylingComponent,
    OptionListExamplesComponent,
  ],
})
export class OptionListDocsComponent {}
