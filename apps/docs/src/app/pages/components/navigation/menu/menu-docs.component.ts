import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { MenuOverviewComponent } from './overview/overview.component';
import { MenuApiComponent } from './api/api.component';
import { MenuStylingComponent } from './styling/styling.component';
import { MenuExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-menu',
  templateUrl: './menu-docs.component.html',
  imports: [
    ComponentShellComponent,
    MenuOverviewComponent,
    MenuApiComponent,
    MenuStylingComponent,
    MenuExamplesComponent,
  ],
})
export class MenuDocsComponent {}
