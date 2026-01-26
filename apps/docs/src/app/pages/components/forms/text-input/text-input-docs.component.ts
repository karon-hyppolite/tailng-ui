import { Component } from '@angular/core';
import {
  TailngTabsComponent,
  TailngTabComponent,
  TailngTabPanelComponent,
} from '@tociva/tailng-ui';

@Component({
  standalone: true,
  selector: 'docs-text-input',
  templateUrl: './text-input-docs.component.html',
  imports: [TailngTabsComponent, TailngTabComponent, TailngTabPanelComponent],
})
export class TextInputDocsComponent {}