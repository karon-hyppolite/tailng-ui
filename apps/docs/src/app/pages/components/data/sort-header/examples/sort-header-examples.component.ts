import { Component, computed, signal } from '@angular/core';
import {
  TngCol,
  TngTable,
  TngHeaderDef,
  TngSortHeaderDirective,
  TngSortIcon,
  TngSort,
} from '@tailng-ui/ui/table';
import {
  ExampleBlockComponent,
  TngExampleDemo,
  TngExampleTitle,
} from '../../../../../shared/example-block/example-block.component';

type Txn = {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: string;
};

@Component({
  standalone: true,
  selector: 'docs-sort-header-examples',
  templateUrl: './sort-header-examples.component.html',
  imports: [
    TngTable,
    TngCol,
    TngHeaderDef,
    TngSortHeaderDirective,
    TngSortIcon,
    ExampleBlockComponent,
    TngExampleDemo,
    TngExampleTitle,
  ],
})
export class SortHeaderExamplesComponent {
  readonly rows = signal<Txn[]>([
    { id: 'TXN-1001', date: '2026-01-08', description: 'UPI • Amazon Pay', amount: -1299, status: 'Success' },
    { id: 'TXN-1002', date: '2026-01-08', description: 'NEFT • Salary Credit', amount: 65000, status: 'Success' },
    { id: 'TXN-1003', date: '2026-01-09', description: 'Card • Fuel', amount: -1200.5, status: 'Pending' },
    { id: 'TXN-1004', date: '2026-01-09', description: 'IMPS • Rent', amount: -15000, status: 'Failed' },
  ]);

  readonly sort = signal<TngSort>({ active: '', direction: '' });

  readonly dateValue = (r: Txn) => r.date;
  readonly descValue = (r: Txn) => r.description;
  readonly amountValue = (r: Txn) => r.amount;
  readonly statusValue = (r: Txn) => r.status;

  onSortChange(s: TngSort): void {
    this.sort.set(s);
  }

  badgeClass(status: unknown): string {
    switch (String(status)) {
      case 'Success':
        return 'bg-success text-white';
      case 'Pending':
        return 'bg-warning text-black';
      case 'Failed':
        return 'bg-danger text-white';
      default:
        return 'bg-info text-white';
    }
  }

  readonly fullExampleHtml = computed(
    () => `
<tng-table [rows]="rows()" rowKey="id" (sortChange)="onSortChange($event)">
  <tng-col id="date" header="Date" [value]="dateValue">
    <ng-template tngHeader let-colId="colId" let-header="header">
      <button tngSortHeader [colId]="colId"><span>{{ header }}</span><tng-sort-icon /></button>
    </ng-template>
  </tng-col>
  <tng-col id="amount" header="Amount" [value]="amountValue">...</tng-col>
  <tng-col id="status" header="Status" [value]="statusValue">...</tng-col>
</tng-table>
`,
  );
}
