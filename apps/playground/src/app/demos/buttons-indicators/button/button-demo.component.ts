import { Component } from '@angular/core';
import { TailngButtonComponent } from '@tailng/ui';
import { TailngIconComponent } from '@tailng/icons';

@Component({
  selector: 'playground-button-demo',
  standalone: true,
  imports: [TailngButtonComponent, TailngIconComponent],
  templateUrl: './button-demo.component.html',
})
export class ButtonDemoComponent {}
