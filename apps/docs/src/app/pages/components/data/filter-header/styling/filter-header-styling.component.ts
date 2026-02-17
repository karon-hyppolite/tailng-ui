import { Component, computed, signal } from '@angular/core';
import { TngIcon } from '@tailng-ui/icons/icon';
import { TngTag } from '@tailng-ui/ui/primitives';
import {
  TngCol,
  TngColumnFilterMeta,
  TngFilterPanel,
  TngFilterTrigger,
  TngHeaderDef,
  TngTable,
} from '@tailng-ui/ui/table';
import {
  ExampleBlockComponent,
  TngExampleDemo,
  TngExampleTitle,
} from '../../../../../shared/example-block/example-block.component';

type Row = { id: string; name: string; score: number };

@Component({
  standalone: true,
  selector: 'docs-filter-header-styling',
  templateUrl: './filter-header-styling.component.html',
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
    TngExampleTitle,
  ],
})
export class FilterHeaderStylingComponent {
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

  readonly triggerIconHtml = computed(
    () => `class="rounded border px-2 py-0.5 text-xs cursor-pointer" tngFilterTrigger [colId]="colId"`
  );
  readonly triggerButtonHtml = computed(
    () => `class="rounded border px-3 py-1 text-xs font-medium" tngFilterTrigger [colId]="colId"`
  );
}
