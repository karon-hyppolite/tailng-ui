import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { IconOverviewComponent } from './overview/overview.component';
import { IconApiComponent } from './api/api.component';
import { IconStylingComponent } from './styling/styling.component';
import { IconExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-icon',
  templateUrl: './icon-docs.component.html',
  imports: [
    ComponentShellComponent,
    IconOverviewComponent,
    IconApiComponent,
    IconStylingComponent,
    IconExamplesComponent,
  ],
})
export class IconDocsComponent {}
