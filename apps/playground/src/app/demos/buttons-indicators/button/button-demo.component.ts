import { Component } from '@angular/core';
import { TngButton } from '@tailng-ui/tailng-ui/primitives';
import { TngIcon } from '@tailng-ui/tailng-icons/icon';

@Component({
  selector: 'playground-button-demo',
  standalone: true,
  imports: [TngButton, TngIcon],
  templateUrl: './button-demo.component.html',
})
export class ButtonDemoComponent {}
