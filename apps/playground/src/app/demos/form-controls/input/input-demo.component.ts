import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TailngInputComponent } from '@tailng/ui';

@Component({
  selector: 'playground-input-demo',
  standalone: true,
  imports: [FormsModule, TailngInputComponent],
  templateUrl: './input-demo.component.html',
})
export class InputDemoComponent {
  name = signal('TailNG');
}

