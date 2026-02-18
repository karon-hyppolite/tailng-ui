import { Component, computed } from '@angular/core';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent} from '../../../../../shared/example-block/example-block.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngTimepicker } from '@tailng-ui/ui/form';
import { RouterLink } from "@angular/router";

@Component({
  standalone: true,
  selector: 'docs-timepicker-overview',
  templateUrl: './timepicker-overview.component.html',
  imports: [ExampleBlockComponent, TngTag, ReactiveFormsModule, TngTimepicker, RouterLink],
})
export class TimepickerOverviewComponent {

  form = new FormGroup({
    timeValue: new FormControl('', { nonNullable: false }),
  });



  readonly basicHtml = computed(
    () => `
 <form [formGroup]="form">
  <tng-timepicker formControlName="timeValue"></tng-timepicker>
</form>
`,
  );

  readonly basicTs = computed(
    () => `
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngTimepicker } from '@tailng-ui/ui/form';

@Component({
  selector: 'datepicker-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TngTimepicker]
})
export class DatepickerDemoComponent {
  form = new FormGroup({
    timeValue: new FormControl('', { nonNullable: false }),
  });
}
`,
  );
}

