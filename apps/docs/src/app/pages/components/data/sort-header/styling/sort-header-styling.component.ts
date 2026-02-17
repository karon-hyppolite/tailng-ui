import { Component, computed, signal } from '@angular/core';
import { TngTag } from '@tailng-ui/ui/primitives';
import {
  TngCol,
  TngHeaderDef,
  TngSortHeaderDirective,
  TngSortIcon,
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
  selector: 'docs-sort-header-styling',
  templateUrl: './sort-header-styling.component.html',
  imports: [
    TngTable,
    TngCol,
    TngHeaderDef,
    TngSortHeaderDirective,
    TngSortIcon,
    TngTag,
    ExampleBlockComponent,
    TngExampleDemo,
    TngExampleTitle,
  ],
})
export class SortHeaderStylingComponent {
  readonly rows = signal<Row[]>([
    { id: '1', name: 'Alice', score: 92 },
    { id: '2', name: 'Bob', score: 87 },
    { id: '3', name: 'Carol', score: 95 },
  ]);

  readonly nameValue = (r: Row) => r.name;
  readonly scoreValue = (r: Row) => r.score;

  readonly buttonHtml = computed(
    () => `class="inline-flex items-center gap-1 hover:underline" tngSortHeader [colId]="colId"`
  );
  readonly iconHtml = computed(
    () => `tng-sort-icon with opacity-40 when unsorted — style the wrapper button`
  );
}
