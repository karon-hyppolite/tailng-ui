import { Component } from '@angular/core';
import { TailngTooltipComponent } from '@tociva/tailng-ui/popups-overlays';

@Component({
  selector: 'playground-tooltip-demo',
  standalone: true,
  imports: [TailngTooltipComponent],
  templateUrl: './tooltip-demo.component.html',
})
export class TooltipDemoComponent {}
