import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { CopyButtonOverviewComponent } from './overview/overview.component';
import { CopyButtonApiComponent } from './api/api.component';
import { CopyButtonStylingComponent } from './styling/styling.component';
import { CopyButtonExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-copy-button',
  templateUrl: './copy-button-docs.component.html',
  imports: [
    ComponentShellComponent,
    CopyButtonOverviewComponent,
    CopyButtonApiComponent,
    CopyButtonStylingComponent,
    CopyButtonExamplesComponent,
  ],
})
export class CopyButtonDocsComponent {}
