import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { NumberInputOverviewComponent } from './overview/overview.component';
import { NumberInputApiComponent } from './api/api.component';
import { NumberInputStylingComponent } from './styling/styling.component';
import { NumberInputExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-number-input',
  templateUrl: './number-input-docs.component.html',
  imports: [
    ComponentShellComponent,
    NumberInputOverviewComponent,
    NumberInputApiComponent,
    NumberInputStylingComponent,
    NumberInputExamplesComponent,
  ],
})
export class NumberInputDocsComponent {}
