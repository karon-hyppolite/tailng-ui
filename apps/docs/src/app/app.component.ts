import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TailngButtonComponent, TailngCardComponent, TailngInputComponent } from '@tailng/ui';
import { TailngIconComponent } from '@tailng/icons';

@Component({
  selector: 'docs-root',
  standalone: true,
  imports: [FormsModule, TailngButtonComponent, TailngInputComponent, TailngCardComponent, TailngIconComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  name = signal('TailNG');
}
