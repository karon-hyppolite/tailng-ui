import { Component, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TngTimepicker } from '@tailng-ui/ui/form';
import { TngTag } from '@tailng-ui/ui/primitives';
import {
  ExampleBlockComponent,
  TngExampleDemo,
} from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-timepicker-examples',
  templateUrl: './timepicker-examples.component.html',
  imports: [TngTimepicker, TngTag, ExampleBlockComponent, ReactiveFormsModule],
})
export class TimepickerExamplesComponent {
  form = new FormGroup({
    timeValue: new FormControl<string>('', {
      nonNullable: false,
      validators: [
        Validators.required,
        Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/), // HH:mm or HH:mm:ss
        // For 12-hour hh:mm AM/PM format:
        // Validators.pattern(/^(0?[1-9]|1[0-2]):[0-5][0-9](:[0-5][0-9])?\s?(AM|PM)$/i)  
    ],
    }),
  });

  get timeValueCtrl() {
    return this.form.controls.timeValue;
  }

  readonly basicHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-timepicker formControlName="timeValue"/>
</form>
`,
  );

  readonly basicTs = computed(
    () => `
form = new FormGroup({
  period: new FormControl<string>(', { nonNullable: false }),
});
`,
  );

  readonly validationHtml = computed(
    () => `
<form [formGroup]="form" class="w-full max-w-sm space-y-2">
  <tng-timepicker formControlName="timeValue" [showSeconds]="true" [hourFormat]="24"></tng-timepicker>
    @if (timeValueCtrl.touched && timeValueCtrl.invalid) {
      <p class="text-xs text-red-600">Please select a valid time.</p>
    }
</form>
`,
  );
  readonly validationTs = computed(
    () => `
form = new FormGroup({
    timeValue: new FormControl<string>('', {
      nonNullable: false,
      validators: [
        Validators.required,
        Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/), // HH:mm or HH:mm:ss
        // For 12-hour hh:mm AM/PM format:
        // Validators.pattern(/^(0?[1-9]|1[0-2]):[0-5][0-9](:[0-5][0-9])?\s?(AM|PM)$/i)  
    ],
    }),
  });
`,
  );


  readonly formatHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-timepicker formControlName="timeValue" [hourFormat]="24"/>
</form>
`,
  );
}
