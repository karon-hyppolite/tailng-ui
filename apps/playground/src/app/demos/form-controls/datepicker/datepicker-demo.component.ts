import { Component } from '@angular/core';
import { TailngDatepickerComponent } from '@tailng/ui';

@Component({
  selector: 'playground-datepicker-demo',
  standalone: true,
  imports: [TailngDatepickerComponent],
  templateUrl: './datepicker-demo.component.html',
})
export class DatepickerDemoComponent {}

