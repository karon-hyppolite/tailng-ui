import { Component, computed, inject, signal } from '@angular/core';
import { TngCol, TngTable } from '@tailng-ui/ui/table';
import { TngCodeBlock } from '@tailng-ui/ui/utilities';
import { ShikiHighlighterService } from '../../../../../shared/shiki-highlighter.service';
import { TngShikiAdapter } from '../../../../../shared/tng-shiki.adapter';
import { RouterLink } from '@angular/router';

type displayDetails = {
  property: string;
  type: string;
  default?: string;
  description: string;
};

@Component({
  standalone: true,
  selector: 'docs-timepicker-api',
  templateUrl: './timepicker-api.component.html',
    imports: [TngCodeBlock, TngTable, TngCol,RouterLink],

})
export class TimepickerApiComponent {
   private shiki = inject(ShikiHighlighterService);
  readonly highlighter = new TngShikiAdapter(this.shiki);
  readonly importExample = computed(() => `import { TngTimepicker } from '@tailng-ui/ui/form';`);

  private readonly seed: displayDetails[] = [
    { property: 'hourFormat', type: 'number | null', default: '12', description: 'Select the time format: 12-hour or 24-hour.' },
    { property: 'disabled', type: 'boolean', default: 'false', description: 'Sets the disabled state of the timepicker.' },
    { property: 'showSeconds', type: 'boolean', default: 'false', description: 'Controls whether seconds are displayed in the panel.' },
    // { property: 'locale', type: 'string | null', default: 'null', description: 'Optional locale for formatting' },
    { property: 'slot', type: 'TngSlotMap<TngTimepickerSlot>', default: '{}', description: 'Slot-based micro styling for container, disabled, field, input, toggle, toggleIcon, overlayPanel, panelFrame, panelLayout, title, timeDisplay, hourRail, hourNavPrev, hourNavNext, hourList, hourItem, minuteRail, minuteNavPrev, minuteNavNext, minuteList, minuteItem, secondRail, secondNavPrev, secondNavNext, secondList, secondItem, period, periodRail, actionBar, cancel, confirm' },
  ];

  readonly mainRows = signal<displayDetails[]>(this.seed.filter((p) =>
    ['hourFormat', 'disabled', 'showSeconds'].includes(p.property)
  ));
  readonly stylingRows = signal<displayDetails[]>(this.seed.filter((p) =>
    ['slot'].includes(p.property)
  ));

  readonly property = (r: displayDetails) => r.property;
  readonly type = (r: displayDetails) => r.type;
  readonly default = (r: displayDetails) => r.default;
  readonly description = (r: displayDetails) => r.description;

}
