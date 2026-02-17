import { Component, computed, signal } from '@angular/core';
import {
  TngCol,
  TngTable,
  TngHeaderDef,
  TngSortHeaderDirective,
  TngSortIcon,
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
  selector: 'docs-sort-header-overview',
  templateUrl: './sort-header-overview.component.html',
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
export class SortHeaderOverviewComponent {
  readonly rows = signal<Txn[]>([
    { id: 'TXN-1', date: '2026-01-08', description: 'UPI • Amazon Pay', amount: -1299, status: 'Success' },
    { id: 'TXN-2', date: '2026-01-08', description: 'NEFT • Salary', amount: 65000, status: 'Success' },
    { id: 'TXN-3', date: '2026-01-09', description: 'Card • Fuel', amount: -1200, status: 'Pending' },
    { id: 'TXN-4', date: '2026-01-09', description: 'IMPS • Rent', amount: -15000, status: 'Failed' },
  ]);

  readonly dateValue = (r: Txn) => r.date;
  readonly descValue = (r: Txn) => r.description;
  readonly amountValue = (r: Txn) => r.amount;
  readonly statusValue = (r: Txn) => r.status;

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

  readonly quickExampleHtml = computed(
    () => `
<tng-col id="date" header="Date" [value]="dateValue">
  <ng-template tngHeader let-colId="colId" let-header="header">
    <button type="button" class="inline-flex items-center gap-1" tngSortHeader [colId]="colId">
      <span>{{ header }}</span>
      <tng-sort-icon />
    </button>
  </ng-template>
</tng-col>
`,
  );
}
