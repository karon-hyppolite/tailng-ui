import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { DialogOverviewComponent } from './overview/overview.component';
import { DialogApiComponent } from './api/api.component';
import { DialogStylingComponent } from './styling/styling.component';
import { DialogExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-dialog',
  templateUrl: './dialog-docs.component.html',
  imports: [
    ComponentShellComponent,
    DialogOverviewComponent,
    DialogApiComponent,
    DialogStylingComponent,
    DialogExamplesComponent,
  ],
})
export class DialogDocsComponent {}
