import { Component, computed } from '@angular/core';
import { TngCopyButton } from '@tailng-ui/ui/utilities';
import { TngTag } from '@tailng-ui/ui/primitives';
import {
  ExampleBlockComponent,
  TngExampleDemo,
  TngExampleTitle,
} from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-copy-button-styling',
  templateUrl: './copy-button-styling.component.html',
  imports: [
    TngCopyButton,
    TngTag,
    ExampleBlockComponent,
    TngExampleDemo,
    TngExampleTitle,
  ],
})
export class CopyButtonStylingComponent {
  readonly snippet = computed(() => 'Text to copy');

  readonly slotIntroHtml = computed(
    () => `[slot]="{ container: '…', content: '…' }"`,
  );
  readonly containerSlotHtml = computed(
    () => `[slot]="{ container: 'rounded-xl shadow-md min-w-24' }"`,
  );
  readonly contentSlotHtml = computed(
    () => `[slot]="{ content: 'text-primary gap-2' }"`,
  );
  readonly allSlotsHtml = computed(
    () => `[slot]="{
  container: 'rounded-lg border-2 border-primary/50',
  content: 'inline-flex items-center gap-2 text-primary'
}"`,
  );
}
