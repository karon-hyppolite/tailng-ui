import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { AccordionOverviewComponent } from './overview/overview.component';
import { AccordionApiComponent } from './api/api.component';
import { AccordionStylingComponent } from './styling/styling.component';
import { AccordionExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-accordion',
  templateUrl: './accordion-docs.component.html',
  imports: [
    ComponentShellComponent,
    AccordionOverviewComponent,
    AccordionApiComponent,
    AccordionStylingComponent,
    AccordionExamplesComponent,
  ],
})
export class AccordionDocsComponent {}
