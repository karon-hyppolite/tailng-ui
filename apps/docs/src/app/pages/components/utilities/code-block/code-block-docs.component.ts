import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { CodeBlockOverviewComponent } from './overview/overview.component';
import { CodeBlockApiComponent } from './api/api.component';
import { CodeBlockStylingComponent } from './styling/styling.component';
import { CodeBlockExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-code-block',
  templateUrl: './code-block-docs.component.html',
  imports: [
    ComponentShellComponent,
    CodeBlockOverviewComponent,
    CodeBlockApiComponent,
    CodeBlockStylingComponent,
    CodeBlockExamplesComponent,
  ],
})
export class CodeBlockDocsComponent {}
