import { Component, computed, signal } from '@angular/core';
import { TngDialog } from '@tailng-ui/ui/overlay';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-dialog-styling',
  templateUrl: './dialog-styling.component.html',
  imports: [TngDialog, TngTag, ExampleBlockComponent, TngExampleDemo],
})
export class DialogStylingComponent {
  readonly open = signal(false);
  readonly openBackdrop = signal(false);
  readonly openPanel = signal(false);
  readonly openHeader = signal(false);
  readonly openBody = signal(false);
  readonly openFooter = signal(false);
  readonly openCombined = signal(false);

  readonly backdropSlotHtml = computed(
    () => `<tng-dialog [slot]="{ backdrop: 'fixed inset-0 bg-black/60' }">...</tng-dialog>`,
  );
  readonly panelSlotHtml = computed(
    () => `<tng-dialog [slot]="{ panel: '... w-80 rounded-xl border-2 ...' }">...</tng-dialog>`,
  );
  readonly headerWrapSlotHtml = computed(
    () => `<tng-dialog [slot]="{ headerWrap: 'border-b border-primary px-4 py-3' }">...</tng-dialog>`,
  );
  readonly bodyWrapSlotHtml = computed(
    () => `<tng-dialog [slot]="{ bodyWrap: 'px-6 py-6' }">...</tng-dialog>`,
  );
  readonly footerWrapSlotHtml = computed(
    () => `<tng-dialog [slot]="{ footerWrap: 'border-t px-4 py-3 flex justify-end gap-2' }">...</tng-dialog>`,
  );
  readonly combinedSlotHtml = computed(
    () => `<tng-dialog [slot]="{ backdrop: '...', panel: '...', headerWrap: '...', footerWrap: '...' }">...</tng-dialog>`,
  );
}
