import { Component } from '@angular/core';
import { TailngIconComponent } from '@tociva/tailng-icons';
import { TailngBadgeComponent, TailngTextInputComponent } from '@tociva/tailng-ui';

@Component({
  standalone: true,
  selector: 'docs-text-input-overview',
  templateUrl: './overview.component.html',
  imports: [
    TailngIconComponent,
    TailngTextInputComponent,
    TailngBadgeComponent
    ],
})
export class TextInputOverviewComponent {}
