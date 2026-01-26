import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { TextInputOverviewComponent } from './overview/overview.component';
import { TextInputApiComponent } from './api/api.component';
import { TextInputStylingComponent } from './styling/styling.component';
import { TextInputExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-text-input',
  templateUrl: './text-input-docs.component.html',
  imports: [
    ComponentShellComponent,
    TextInputOverviewComponent,
    TextInputApiComponent,
    TextInputStylingComponent,
    TextInputExamplesComponent,
  ],
})
export class TextInputDocsComponent {}