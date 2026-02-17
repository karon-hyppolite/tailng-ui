import { Component, computed, signal } from '@angular/core';
import { TngBreadcrumbs, TngBreadcrumbItem } from '@tailng-ui/ui/navigation';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-breadcrumbs-styling',
  templateUrl: './breadcrumbs-styling.component.html',
  imports: [TngBreadcrumbs, TngTag, ExampleBlockComponent, TngExampleDemo],
})
export class BreadcrumbsStylingComponent {
  readonly items = signal<TngBreadcrumbItem[]>([
    { label: 'Home', route: '/' },
    { label: 'Docs', route: '/docs' },
    { label: 'Breadcrumbs' },
  ]);
  readonly itemsWithDisabled = signal<TngBreadcrumbItem[]>([
    { label: 'Home', route: '/' },
    { label: 'Docs', disabled: true },
    { label: 'Breadcrumbs' },
  ]);
  readonly containerSlotHtml = computed(
    () => `<tng-breadcrumbs [slot]="{ container: 'flex items-center gap-2 text-base' }">...</tng-breadcrumbs>`,
  );
  readonly listSlotHtml = computed(
    () => `<tng-breadcrumbs [slot]="{ list: 'flex items-center gap-2' }">...</tng-breadcrumbs>`,
  );
  readonly itemSlotHtml = computed(
    () => `<tng-breadcrumbs [slot]="{ item: 'inline-flex items-center gap-1' }">...</tng-breadcrumbs>`,
  );
  readonly linkSlotHtml = computed(
    () => `<tng-breadcrumbs [slot]="{ link: 'text-blue-600 hover:underline' }">...</tng-breadcrumbs>`,
  );
  readonly currentSlotHtml = computed(
    () => `<tng-breadcrumbs [slot]="{ current: 'text-foreground font-semibold' }">...</tng-breadcrumbs>`,
  );
  readonly disabledSlotHtml = computed(
    () => `<tng-breadcrumbs [slot]="{ disabled: 'opacity-50 cursor-not-allowed' }">...</tng-breadcrumbs>`,
  );
  readonly separatorSlotHtml = computed(
    () => `<tng-breadcrumbs [slot]="{ separator: 'mx-2 text-slate-500' }">...</tng-breadcrumbs>`,
  );
  readonly combinedSlotHtml = computed(
    () => `<tng-breadcrumbs [slot]="{ link: 'text-primary hover:underline', current: 'font-semibold', separator: 'mx-2 text-slate-500' }">...</tng-breadcrumbs>`,
  );
}
