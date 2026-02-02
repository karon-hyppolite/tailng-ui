import { Component } from '@angular/core';
import { TailngTimepickerComponent } from '@tociva/tailng-ui/form-controls';

@Component({
  selector: 'playground-timepicker-demo',
  standalone: true,
  imports: [TailngTimepickerComponent],
  templateUrl: './timepicker-demo.component.html',
})
export class TimepickerDemoComponent {}

