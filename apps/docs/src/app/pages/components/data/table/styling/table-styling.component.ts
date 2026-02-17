import { Component, computed, signal } from '@angular/core';
import { TngCol, TngTable } from '@tailng-ui/ui/table';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

type Row = { id: string; name: string; score: number };

@Component({
  standalone: true,
  selector: 'docs-table-styling',
  templateUrl: './table-styling.component.html',
  imports: [TngTable, TngCol, TngTag, ExampleBlockComponent, TngExampleDemo],
})
export class TableStylingComponent {
  readonly rows = signal<Row[]>([
    { id: '1', name: 'Alice', score: 92 },
    { id: '2', name: 'Bob', score: 87 },
  ]);

  readonly nameValue = (r: Row) => r.name;
  readonly scoreValue = (r: Row) => r.score;

  readonly tableSlotHtml = computed(
    () => `<tng-table [slot]="{ table: 'w-full text-sm min-w-full' }">...</tng-table>`,
  );
  readonly theadSlotHtml = computed(
    () => `<tng-table [slot]="{ thead: 'bg-primary/10' }">...</tng-table>`,
  );
  readonly thSlotHtml = computed(
    () => `<tng-table [slot]="{ th: 'px-4 py-3 font-bold' }">...</tng-table>`,
  );
  readonly tdSlotHtml = computed(
    () => `<tng-table [slot]="{ td: 'px-4 py-3' }">...</tng-table>`,
  );
  readonly tbodySlotHtml = computed(
    () => `<tng-table [slot]="{ tbody: 'bg-slate-50' }">...</tng-table>`,
  );
  readonly combinedSlotHtml = computed(
    () => `
<tng-table [slot]="{ table: 'w-full text-sm', thead: 'bg-primary/10', th: 'px-4 py-3 font-bold border-b border-border', td: 'px-4 py-3 border-b border-border align-middle', tbody: 'bg-bg' }">
  <tng-col id="name" header="Name" [value]="nameValue"></tng-col>
  <tng-col id="score" header="Score" align="right" [value]="scoreValue"></tng-col>
</tng-table>
`,
  );
}
