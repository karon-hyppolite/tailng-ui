import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { ChipsOverviewComponent } from './overview/overview.component';
import { ChipsApiComponent } from './api/api.component';
import { ChipsStylingComponent } from './styling/styling.component';
import { ChipsExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-chips',
  templateUrl: './chips-docs.component.html',
  imports: [
    ComponentShellComponent,
    ChipsOverviewComponent,
    ChipsApiComponent,
    ChipsStylingComponent,
    ChipsExamplesComponent,
  ],
})
export class ChipsDocsComponent {}
