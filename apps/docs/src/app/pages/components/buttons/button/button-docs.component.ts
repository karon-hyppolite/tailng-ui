import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { ButtonOverviewComponent } from './overview/overview.component';
import { ButtonApiComponent } from './api/api.component';
import { ButtonStylingComponent } from './styling/styling.component';
import { ButtonExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-button',
  templateUrl: './button-docs.component.html',
  imports: [
    ComponentShellComponent,
    ButtonOverviewComponent,
    ButtonApiComponent,
    ButtonStylingComponent,
    ButtonExamplesComponent,
  ],
})
export class ButtonDocsComponent {}
