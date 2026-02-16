import { Component, computed } from '@angular/core';
import { TngMenu, TngMenuItem, TngMenuTemplate } from '@tailng-ui/ui/navigation';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-menu-styling',
  templateUrl: './menu-styling.component.html',
  imports: [TngMenu, TngMenuItem, TngMenuTemplate, TngTag, ExampleBlockComponent, TngExampleDemo],
})
export class MenuStylingComponent {
  readonly containerSlotHtml = computed(
    () => `<tng-menu [slot]="{ container: 'relative inline-block' }">...</tng-menu>`,
  );
  readonly triggerSlotHtml = computed(
    () => `<tng-menu [slot]="{ trigger: 'rounded-md bg-primary px-3 py-2 text-on-primary' }">...</tng-menu>`,
  );
  readonly panelSlotHtml = computed(
    () => `<tng-menu [slot]="{ panel: 'p-2 min-w-48 rounded-lg border border-border' }">...</tng-menu>`,
  );
  readonly backdropSlotHtml = computed(
    () => `<tng-menu [modal]="true" [slot]="{ backdrop: 'fixed inset-0 bg-primary/20 z-[999]' }">...</tng-menu>`,
  );
  readonly combinedHtml = computed(
    () => `
<tng-menu [slot]="{
  container: 'relative inline-block',
  trigger: 'rounded-md bg-primary px-3 py-2 text-sm text-on-primary',
  panel: 'p-2 min-w-48 rounded-lg border border-border bg-bg shadow-lg'
}">
  <button tngMenuTrigger>Actions</button>
  <ng-template tngMenuTemplate>...</ng-template>
</tng-menu>
`,
  );
}
