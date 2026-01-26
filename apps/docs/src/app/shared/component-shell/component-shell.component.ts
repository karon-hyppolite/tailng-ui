import { Component } from '@angular/core';
import {
  TailngTabsComponent,
  TailngTabComponent,
  TailngTabPanelComponent,
} from '@tociva/tailng-ui';

@Component({
  standalone: true,
  selector: 'docs-component-shell',
  templateUrl: './component-shell.component.html',
  imports: [TailngTabsComponent, TailngTabComponent, TailngTabPanelComponent],
})
export class ComponentShellComponent {}
