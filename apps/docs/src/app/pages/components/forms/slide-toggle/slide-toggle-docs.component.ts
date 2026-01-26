import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { SlideToggleOverviewComponent } from './overview/overview.component';
import { SlideToggleApiComponent } from './api/api.component';
import { SlideToggleStylingComponent } from './styling/styling.component';
import { SlideToggleExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-slide-toggle',
  templateUrl: './slide-toggle-docs.component.html',
  imports: [
    ComponentShellComponent,
    SlideToggleOverviewComponent,
    SlideToggleApiComponent,
    SlideToggleStylingComponent,
    SlideToggleExamplesComponent,
  ],
})
export class SlideToggleDocsComponent {}
