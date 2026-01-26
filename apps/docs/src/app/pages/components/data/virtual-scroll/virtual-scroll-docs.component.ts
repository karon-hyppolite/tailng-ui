import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { VirtualScrollOverviewComponent } from './overview/overview.component';
import { VirtualScrollApiComponent } from './api/api.component';
import { VirtualScrollStylingComponent } from './styling/styling.component';
import { VirtualScrollExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-virtual-scroll',
  templateUrl: './virtual-scroll-docs.component.html',
  imports: [
    ComponentShellComponent,
    VirtualScrollOverviewComponent,
    VirtualScrollApiComponent,
    VirtualScrollStylingComponent,
    VirtualScrollExamplesComponent,
  ],
})
export class VirtualScrollDocsComponent {}
