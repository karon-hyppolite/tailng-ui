import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { SidenavOverviewComponent } from './overview/overview.component';
import { SidenavApiComponent } from './api/api.component';
import { SidenavStylingComponent } from './styling/styling.component';
import { SidenavExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-sidenav',
  templateUrl: './sidenav-docs.component.html',
  imports: [
    ComponentShellComponent,
    SidenavOverviewComponent,
    SidenavApiComponent,
    SidenavStylingComponent,
    SidenavExamplesComponent,
  ],
})
export class SidenavDocsComponent {}
