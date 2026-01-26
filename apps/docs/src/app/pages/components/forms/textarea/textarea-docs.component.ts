import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { TextareaOverviewComponent } from './overview/overview.component';
import { TextareaApiComponent } from './api/api.component';
import { TextareaStylingComponent } from './styling/styling.component';
import { TextareaExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-textarea',
  templateUrl: './textarea-docs.component.html',
  imports: [
    ComponentShellComponent,
    TextareaOverviewComponent,
    TextareaApiComponent,
    TextareaStylingComponent,
    TextareaExamplesComponent,
  ],
})
export class TextareaDocsComponent {}
