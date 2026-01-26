import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { CardOverviewComponent } from './overview/overview.component';
import { CardApiComponent } from './api/api.component';
import { CardStylingComponent } from './styling/styling.component';
import { CardExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-card',
  templateUrl: './card-docs.component.html',
  imports: [
    ComponentShellComponent,
    CardOverviewComponent,
    CardApiComponent,
    CardStylingComponent,
    CardExamplesComponent,
  ],
})
export class CardDocsComponent {}
