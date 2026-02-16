import { Component, computed } from '@angular/core';
import { TngTooltip } from '@tailng-ui/ui/overlay';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-tooltip-styling',
  templateUrl: './tooltip-styling.component.html',
  imports: [TngTooltip, TngTag, ExampleBlockComponent, TngExampleDemo],
})
export class TooltipStylingComponent {
  readonly panelSlotHtml = computed(
    () => `<tng-tooltip [slot]="{ panel: 'px-4 py-3 text-sm' }" text="..."><button>Hover</button></tng-tooltip>`,
  );
  readonly surfaceSlotHtml = computed(
    () => `<tng-tooltip [slot]="{ surface: 'rounded-xl border-2 border-primary shadow-lg' }" text="..."><button>Hover</button></tng-tooltip>`,
  );
  readonly combinedSlotHtml = computed(
    () => `<tng-tooltip [slot]="{ panel: 'px-4 py-3', surface: 'rounded-xl border-2' }" text="..."><button>Hover</button></tng-tooltip>`,
  );
}
