import { Component, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TngCheckbox, TngSlotMap, TngCheckboxSlot } from '@tailng-ui/ui/form';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-checkbox-styling',
  templateUrl: './checkbox-styling.component.html',
  imports: [
    TngCheckbox,
    ReactiveFormsModule,
    TngTag,
    ExampleBlockComponent,
    TngExampleDemo,
  ],
})
export class CheckboxStylingComponent {
  form = new FormGroup({
    opt: new FormControl(false, { nonNullable: true }),
  });

  containerSlot: TngSlotMap<TngCheckboxSlot> = {
    container: 'inline-flex items-center gap-3 cursor-pointer p-2 rounded-lg border-2 border-blue-500',
  };

  inputSlot: TngSlotMap<TngCheckboxSlot> = {
    input: 'h-5 w-5 rounded-full accent-green-600',
  };

  labelSlot: TngSlotMap<TngCheckboxSlot> = {
    label: 'text-lg font-bold text-purple-600',
  };

  readonly containerSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-checkbox formControlName="opt" label="Custom container"
    [slot]="{ container: 'inline-flex items-center gap-3 cursor-pointer p-2 rounded-lg border-2 border-blue-500' }" />
</form>
`,
  );

  readonly containerSlotTs = computed(
    () => `
import { TngCheckbox, TngSlotMap, TngCheckboxSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  containerSlot: TngSlotMap<TngCheckboxSlot> = {
    container: 'inline-flex items-center gap-3 cursor-pointer p-2 rounded-lg border-2 border-blue-500',
  };
}
`,
  );

  readonly inputSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-checkbox formControlName="opt" label="Custom input"
    [slot]="{ input: 'h-5 w-5 rounded-full accent-green-600' }" />
</form>
`,
  );

  readonly inputSlotTs = computed(
    () => `
import { TngCheckbox, TngSlotMap, TngCheckboxSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  inputSlot: TngSlotMap<TngCheckboxSlot> = {
    input: 'h-5 w-5 rounded-full accent-green-600',
  };
}
`,
  );

  readonly labelSlotHtml = computed(
    () => `
<form [formGroup]="form">
  <tng-checkbox formControlName="opt" label="Custom label"
    [slot]="{ label: 'text-lg font-bold text-purple-600' }" />
</form>
`,
  );

  readonly labelSlotTs = computed(
    () => `
import { TngCheckbox, TngSlotMap, TngCheckboxSlot } from '@tailng-ui/ui/form';

export class MyComponent {
  labelSlot: TngSlotMap<TngCheckboxSlot> = {
    label: 'text-lg font-bold text-purple-600',
  };
}
`,
  );
}
