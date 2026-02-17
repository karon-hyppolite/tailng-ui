import { Component, computed } from '@angular/core';
import { TngEmptyState } from '@tailng-ui/ui/table';
import { TngTag } from '@tailng-ui/ui/primitives';
import {
  ExampleBlockComponent,
  TngExampleDemo,
  TngExampleTitle,
} from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-empty-state-styling',
  templateUrl: './empty-state-styling.component.html',
  imports: [
    TngEmptyState,
    TngTag,
    ExampleBlockComponent,
    TngExampleDemo,
    TngExampleTitle,
  ],
})
export class EmptyStateStylingComponent {
  readonly slotIntroHtml = computed(
    () => `[slot]="{ container: '…', icon: '…', title: '…', message: '…' }"`,
  );
  readonly containerSlotHtml = computed(
    () => `[slot]="{ container: 'min-h-48 bg-alternate-background rounded-lg' }"`,
  );
  readonly iconSlotHtml = computed(
    () => `[slot]="{ icon: 'text-5xl text-primary/60' }"`,
  );
  readonly titleSlotHtml = computed(
    () => `[slot]="{ title: 'text-xl font-bold text-primary' }"`,
  );
  readonly messageSlotHtml = computed(
    () => `[slot]="{ message: 'text-muted max-w-sm italic' }"`,
  );
  readonly allSlotsHtml = computed(
    () => `[slot]="{
  container: 'p-12',
  icon: 'text-5xl text-primary/60',
  title: 'text-xl font-bold text-primary',
  message: 'text-muted max-w-sm'
}"`,
  );
}
