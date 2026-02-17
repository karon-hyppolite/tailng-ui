import { Component, computed, signal } from '@angular/core';
import { TngPaginator, TngPaginatorChange } from '@tailng-ui/ui/navigation';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-paginator-styling',
  templateUrl: './paginator-styling.component.html',
  imports: [TngPaginator, TngTag, ExampleBlockComponent, TngExampleDemo],
})
export class PaginatorStylingComponent {
  readonly page = signal(1);
  readonly pageWithSelect = signal(1);
  readonly pageSizeWithSelect = signal(10);
  readonly pageWithSeparator = signal(1);
  readonly containerSlotHtml = computed(
    () => `<tng-paginator [slot]="{ container: 'flex flex-wrap gap-4 ...' }">...</tng-paginator>`,
  );
  readonly leftSlotHtml = computed(
    () => `<tng-paginator [slot]="{ left: 'text-primary font-medium' }">...</tng-paginator>`,
  );
  readonly rightSlotHtml = computed(
    () => `<tng-paginator [slot]="{ right: 'flex flex-wrap gap-3' }">...</tng-paginator>`,
  );
  readonly buttonSlotHtml = computed(
    () => `<tng-paginator [slot]="{ button: 'rounded-lg px-3 ...' }">...</tng-paginator>`,
  );
  readonly selectSlotHtml = computed(
    () => `<tng-paginator [slot]="{ select: 'rounded-lg border-2 ...' }">...</tng-paginator>`,
  );
  readonly separatorSlotHtml = computed(
    () => `<tng-paginator [slot]="{ separator: 'text-primary font-bold' }" [maxPages]="5">...</tng-paginator>`,
  );
  readonly pillsHtml = computed(
    () => `<tng-paginator [slot]="{ page: 'rounded-full border ...', activePage: 'bg-primary text-on-primary rounded-full px-3' }" ...></tng-paginator>`,
  );
  onChange(e: TngPaginatorChange) {
    this.page.set(e.page);
  }
  onChangeSelect(e: TngPaginatorChange) {
    this.pageWithSelect.set(e.page);
    this.pageSizeWithSelect.set(e.pageSize);
  }
  onChangeSeparator(e: TngPaginatorChange) {
    this.pageWithSeparator.set(e.page);
  }
}
