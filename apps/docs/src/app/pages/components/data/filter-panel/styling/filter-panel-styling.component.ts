import { Component, computed, signal } from '@angular/core';
import { TngIcon } from '@tailng-ui/icons/icon';
import { TngTag } from '@tailng-ui/ui/primitives';
import {
  TngCol,
  TngColumnFilterMeta,
  TngFilterPanel,
  TngFilterTrigger,
  TngHeaderDef,
  TngTable
} from '@tailng-ui/ui/table';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

type Row = { id: string; name: string; score: number };

@Component({
  standalone: true,
  selector: 'docs-filter-panel-styling',
  templateUrl: './filter-panel-styling.component.html',
  imports: [
    TngTable,
    TngCol,
    TngHeaderDef,
    TngFilterTrigger,
    TngFilterPanel,
    TngIcon,
    TngTag,
    ExampleBlockComponent,
    TngExampleDemo,
  ],
})
export class FilterPanelStylingComponent {
  readonly rows = signal<Row[]>([
    { id: '1', name: 'Alice', score: 92 },
    { id: '2', name: 'Bob', score: 87 },
    { id: '3', name: 'Carol', score: 95 },
  ]);

  readonly nameValue = (r: Row) => r.name;
  readonly scoreValue = (r: Row) => r.score;

  filterText(placeholder?: string): TngColumnFilterMeta {
    return { type: 'text', placeholder };
  }
  filterNumber(): TngColumnFilterMeta {
    return { type: 'number' };
  }

  readonly panelSlotHtml = computed(() => `[slot]="{ panel: 'p-1 min-w-48' }"`);
  readonly customPanelHtml = computed(() => `[slot]="{ panel: 'p-4 min-w-64 bg-slate-100 rounded-lg shadow-lg' }"`);
}
