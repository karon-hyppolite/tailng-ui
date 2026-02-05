import { Component, signal } from '@angular/core';
import { TngCopyButton } from '@tailng-ui/tailng-ui/utilities';
import { TngIcon } from "@tailng-ui/tailng-icons/icon";

@Component({
  selector: 'playground-copy-button-demo',
  standalone: true,
  imports: [TngCopyButton, TngIcon],
  templateUrl: './copy-button-demo.component.html',
})
export class CopyButtonDemoComponent {
    readonly code = signal(`npm install @tailng-ui/tailng-ui`);
}
