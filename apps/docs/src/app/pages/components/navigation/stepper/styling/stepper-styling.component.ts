import { Component, computed } from '@angular/core';
import { TngStepper, TngStep, TngStepPanel } from '@tailng-ui/ui/navigation';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-stepper-styling',
  templateUrl: './stepper-styling.component.html',
  imports: [TngStepper, TngStep, TngStepPanel, TngTag, ExampleBlockComponent, TngExampleDemo],
})
export class StepperStylingComponent {
  readonly containerSlotHtml = computed(
    () => `<tng-stepper [slot]="{ container: 'w-full max-w-2xl' }">...</tng-stepper>`,
  );
  readonly headerSlotHtml = computed(
    () => `<tng-stepper [slot]="{ header: 'inline-flex gap-1 rounded-lg bg-slate-100 p-1' }">...</tng-stepper>`,
  );
  readonly headerVerticalSlotHtml = computed(
    () => `<tng-stepper orientation="vertical" [slot]="{ headerVertical: 'flex flex-col gap-1 rounded-lg border p-2' }">...</tng-stepper>`,
  );
  readonly panelWrapSlotHtml = computed(
    () => `<tng-stepper [slot]="{ panelWrap: 'pt-6' }">...</tng-stepper>`,
  );
  readonly stepSlotHtml = computed(
    () => `<tng-step [slot]="{ step: 'rounded-md px-3 py-2 ...', active: 'bg-white shadow-sm', inactive: 'text-slate-600' }">One</tng-step>`,
  );
  readonly pillsHtml = computed(
    () => `
<tng-stepper [slot]="{ header: 'inline-flex gap-1 rounded-lg bg-slate-100 p-1' }">
  <tng-step [slot]="{ step: 'rounded-md px-3 py-2 text-sm font-medium', active: 'bg-white text-slate-900 shadow-sm', inactive: 'text-slate-600 hover:text-slate-900' }">One</tng-step>
  ...
</tng-stepper>
`,
  );
}
