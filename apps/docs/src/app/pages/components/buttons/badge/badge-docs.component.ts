import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { BadgeOverviewComponent } from './overview/overview.component';
import { BadgeApiComponent } from './api/api.component';
import { BadgeStylingComponent } from './styling/styling.component';
import { BadgeExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-badge',
  templateUrl: './badge-docs.component.html',
  imports: [
    ComponentShellComponent,
    BadgeOverviewComponent,
    BadgeApiComponent,
    BadgeStylingComponent,
    BadgeExamplesComponent,
  ],
})
export class BadgeDocsComponent {}
