import { Component, computed, signal } from '@angular/core';
import { TngSnackbarHost, TngSnackbarItem } from '@tailng-ui/ui/overlay';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

const uid = () => Math.random().toString(36).slice(2, 9);

@Component({
  standalone: true,
  selector: 'docs-snackbar-styling',
  templateUrl: './snackbar-styling.component.html',
  imports: [TngSnackbarHost, TngTag, ExampleBlockComponent, TngExampleDemo],
})
export class SnackbarStylingComponent {
  readonly items = signal<TngSnackbarItem[]>([]);
  readonly hostSlotHtml = computed(
    () => `<tng-snackbar-host [slot]="{ host: 'fixed z-[1100] flex flex-col gap-3 p-4' }">...</tng-snackbar-host>`,
  );
  readonly itemSlotHtml = computed(
    () => `<tng-snackbar-host [slot]="{ item: '... rounded-lg border-2 ...' }">...</tng-snackbar-host>`,
  );
  readonly itemInnerSlotHtml = computed(
    () => `<tng-snackbar-host [slot]="{ itemInner: 'flex items-center gap-4 px-4 py-3' }">...</tng-snackbar-host>`,
  );
  readonly messageSlotHtml = computed(
    () => `<tng-snackbar-host [slot]="{ message: 'text-sm font-medium' }">...</tng-snackbar-host>`,
  );
  readonly actionSlotHtml = computed(
    () => `<tng-snackbar-host [slot]="{ action: 'text-primary font-semibold hover:underline' }">...</tng-snackbar-host>`,
  );
  readonly dismissBtnSlotHtml = computed(
    () => `<tng-snackbar-host [slot]="{ dismissBtn: 'text-muted hover:text-foreground' }">...</tng-snackbar-host>`,
  );
  readonly intentSlotHtml = computed(
    () => `<tng-snackbar-host [slot]="{ intentSuccess: 'border-green-500/50', ... }">...</tng-snackbar-host>`,
  );
  readonly themedSlotHtml = computed(
    () => `<tng-snackbar-host [slot]="{ item: '... rounded-lg border-2', intentSuccess: 'border-green-500/50', ... }">...</tng-snackbar-host>`,
  );

  showSnackbar(intent: 'default' | 'success' | 'info' | 'warning' | 'error' = 'default'): void {
    const item: TngSnackbarItem = {
      id: uid(),
      message: `Snackbar (${intent})`,
      intent,
      durationMs: 4000,
    };
    this.items.set([item, ...this.items()].slice(0, 3));
  }

  onDismiss(ev: { id: string; reason: 'timeout' | 'dismiss' | 'action' }): void {
    this.items.set(this.items().filter((x) => x.id !== ev.id));
  }
}
