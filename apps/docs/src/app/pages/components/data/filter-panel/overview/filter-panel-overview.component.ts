import { Component, computed, signal } from '@angular/core';
import {
  TngCol,
  TngTable,
  TngCellDef,
  TngHeaderDef,
  TngFilterPanel,
  TngFilterTrigger,
  TngSortHeaderDirective,
  TngColumnFilterMeta,
} from '@tailng-ui/ui/table';
import { TngIcon } from '@tailng-ui/icons/icon';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

type InvoiceRow = {
  id: string;
  customer: string;
  amount: number;
  billDate: string;
  status: 'paid' | 'pending' | 'overdue';
};

@Component({
  standalone: true,
  selector: 'docs-filter-panel-overview',
  templateUrl: './filter-panel-overview.component.html',
  imports: [
    TngTable,
    TngCol,
    TngCellDef,
    TngHeaderDef,
    TngFilterTrigger,
    TngFilterPanel,
    TngSortHeaderDirective,
    TngIcon,
    ExampleBlockComponent,
    TngExampleDemo,
  ],
})
export class FilterPanelOverviewComponent {
  readonly rows = signal<InvoiceRow[]>([
    { id: 'INV-001', customer: 'Asha Traders', amount: 1200, billDate: '2026-01-02', status: 'paid' },
    { id: 'INV-002', customer: 'Blue Mart', amount: 5600, billDate: '2026-01-03', status: 'pending' },
    { id: 'INV-003', customer: 'Coconut Co', amount: 3400, billDate: '2026-01-04', status: 'overdue' },
    { id: 'INV-004', customer: 'Dawn Stores', amount: 950, billDate: '2026-01-06', status: 'paid' },
    { id: 'INV-005', customer: 'Evergreen', amount: 7800, billDate: '2026-01-08', status: 'pending' },
  ]);

  readonly customerValue = (r: InvoiceRow) => r.customer;
  readonly amountValue = (r: InvoiceRow) => r.amount;
  readonly billDateValue = (r: InvoiceRow) => r.billDate;
  readonly statusValue = (r: InvoiceRow) => r.status;

  filterText(placeholder?: string): TngColumnFilterMeta {
    return { type: 'text', placeholder };
  }
  filterNumber(): TngColumnFilterMeta {
    return { type: 'number' };
  }
  filterDate(): TngColumnFilterMeta {
    return { type: 'date' };
  }
  filterStatus(): TngColumnFilterMeta {
    return {
      type: 'enum',
      options: [
        { value: 'paid', label: 'Paid' },
        { value: 'pending', label: 'Pending' },
        { value: 'overdue', label: 'Overdue' },
      ],
    };
  }

  badgeClass(status: unknown): string {
    switch (String(status)) {
      case 'paid':
        return 'bg-success text-white';
      case 'pending':
        return 'bg-warning text-black';
      case 'overdue':
        return 'bg-danger text-white';
      default:
        return 'bg-info text-white';
    }
  }

  readonly quickExampleHtml = computed(
    () => `
<tng-table [rows]="rows()" rowKey="id">
  <tng-col id="customer" header="Customer" [value]="customerValue" [filter]="filterText('Search…')">
    <ng-template tngHeader let-colId="colId" let-header="header">
      <div class="flex items-center justify-between gap-2">
        <button tngSortHeader [colId]="colId">{{ header }}</button>
        <tng-icon name="bootstrapFunnel" tngFilterTrigger [colId]="colId"
          [slot]="{ panel: 'p-1 min-w-48' }"></tng-icon>
      </div>
    </ng-template>
  </tng-col>
  <!-- more columns with [filter] + tngFilterTrigger -->
  <tng-filter-panel />
</tng-table>
`,
  );
}
