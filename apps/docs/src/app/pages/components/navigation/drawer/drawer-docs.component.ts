import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { DrawerOverviewComponent } from './overview/overview.component';
import { DrawerApiComponent } from './api/api.component';
import { DrawerStylingComponent } from './styling/styling.component';
import { DrawerExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-drawer',
  templateUrl: './drawer-docs.component.html',
  imports: [
    ComponentShellComponent,
    DrawerOverviewComponent,
    DrawerApiComponent,
    DrawerStylingComponent,
    DrawerExamplesComponent,
  ],
})
export class DrawerDocsComponent {}
