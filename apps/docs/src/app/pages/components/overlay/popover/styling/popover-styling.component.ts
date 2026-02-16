import { Component, computed } from '@angular/core';
import { TngPopover } from '@tailng-ui/ui/overlay';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-popover-styling',
  templateUrl: './popover-styling.component.html',
  imports: [TngPopover, TngTag, ExampleBlockComponent, TngExampleDemo],
})
export class PopoverStylingComponent {
  readonly rootSlotHtml = computed(
    () => `<tng-popover [slot]="{ root: 'flex gap-2' }">...</tng-popover>`,
  );
  readonly triggerSlotHtml = computed(
    () => `<tng-popover [slot]="{ trigger: 'rounded-xl bg-primary text-on-primary' }">...</tng-popover>`,
  );
  readonly panelSlotHtml = computed(
    () => `<tng-popover [slot]="{ panel: 'p-4 rounded-lg border border-border shadow-lg' }">...</tng-popover>`,
  );
  readonly themedHtml = computed(
    () => `
<tng-popover placement="bottom-start" [slot]="{ root: 'flex gap-2', trigger: 'rounded-md bg-primary', panel: 'p-3 rounded-lg border border-border bg-bg shadow-lg' }">
  <button tngPopoverTrigger>Styled trigger</button>
  <ng-template #popoverContent>...</ng-template>
</tng-popover>
`,
  );
}
