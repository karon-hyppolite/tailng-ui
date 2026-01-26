import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { ButtonToggleOverviewComponent } from './overview/overview.component';
import { ButtonToggleApiComponent } from './api/api.component';
import { ButtonToggleStylingComponent } from './styling/styling.component';
import { ButtonToggleExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-button-toggle',
  templateUrl: './button-toggle-docs.component.html',
  imports: [
    ComponentShellComponent,
    ButtonToggleOverviewComponent,
    ButtonToggleApiComponent,
    ButtonToggleStylingComponent,
    ButtonToggleExamplesComponent,
  ],
})
export class ButtonToggleDocsComponent {}
