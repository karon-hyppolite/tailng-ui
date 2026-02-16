import { Component, computed, signal } from '@angular/core';
import { TngDrawer } from '@tailng-ui/ui/navigation';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-drawer-styling',
  templateUrl: './drawer-styling.component.html',
  imports: [TngDrawer, TngTag, ExampleBlockComponent, TngExampleDemo],
})
export class DrawerStylingComponent {
  readonly openBackdrop = signal(false);
  readonly openPanel = signal(false);
  readonly openSize = signal(false);
  readonly openHeight = signal(false);
  readonly openCombined = signal(false);
  readonly backdropSlotHtml = computed(
    () => `<tng-drawer [slot]="{ backdrop: 'fixed inset-0 bg-black/60' }">...</tng-drawer>`,
  );
  readonly panelSlotHtml = computed(
    () => `<tng-drawer [slot]="{ panel: 'bg-bg border-l border-border shadow-xl' }">...</tng-drawer>`,
  );
  readonly sizeSlotHtml = computed(
    () => `<tng-drawer [slot]="{ size: 'w-72' }">...</tng-drawer>`,
  );
  readonly heightSlotHtml = computed(
    () => `<tng-drawer placement="bottom" [slot]="{ height: 'h-48' }">...</tng-drawer>`,
  );
  readonly combinedSlotHtml = computed(
    () => `<tng-drawer [slot]="{ panel: 'bg-bg border-l border-border shadow-xl', size: 'w-72' }">...</tng-drawer>`,
  );
}
