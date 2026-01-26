import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { TabsOverviewComponent } from './overview/overview.component';
import { TabsApiComponent } from './api/api.component';
import { TabsStylingComponent } from './styling/styling.component';
import { TabsExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-tabs',
  templateUrl: './tabs-docs.component.html',
  imports: [
    ComponentShellComponent,
    TabsOverviewComponent,
    TabsApiComponent,
    TabsStylingComponent,
    TabsExamplesComponent,
  ],
})
export class TabsDocsComponent {}
