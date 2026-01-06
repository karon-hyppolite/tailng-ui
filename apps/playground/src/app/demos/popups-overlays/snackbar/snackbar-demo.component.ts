import { Component } from '@angular/core';
import { TailngSnackbarComponent } from '@tailng/ui';

@Component({
  selector: 'playground-snackbar-demo',
  standalone: true,
  imports: [TailngSnackbarComponent],
  templateUrl: './snackbar-demo.component.html',
})
export class SnackbarDemoComponent {}

