import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { SliderOverviewComponent } from './overview/overview.component';
import { SliderApiComponent } from './api/api.component';
import { SliderStylingComponent } from './styling/styling.component';
import { SliderExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-slider',
  templateUrl: './slider-docs.component.html',
  imports: [
    ComponentShellComponent,
    SliderOverviewComponent,
    SliderApiComponent,
    SliderStylingComponent,
    SliderExamplesComponent,
  ],
})
export class SliderDocsComponent {}
