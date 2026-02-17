import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TngSlotMap, TngSlotValue } from '@tailng-ui/ui';

import { TngBreadcrumbsSlot } from './breadcrumbs.slots';

export type TngBreadcrumbItem = {
  label: string;

  /** Internal route */
  route?: string;

  /** External link */
  href?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
  rel?: string;

  /** If true, renders as current page even if not last */
  current?: boolean;

  /** If true, not clickable */
  disabled?: boolean;
};

@Component({
  selector: 'tng-breadcrumbs',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumbs.component.html',
})
export class TngBreadcrumbs {
  /** Items */
  readonly items = input<TngBreadcrumbItem[]>([]);

  /** Optional Home crumb (prepended) */
  readonly home = input<TngBreadcrumbItem | null>(null);

  /** Separator text (if you later want icons, change template to project) */
  readonly separator = input<string>('/');

  /** a11y label */
  readonly ariaLabel = input<string>('Breadcrumb');

  /* =====================
   * Slot hooks (micro styling)
   * ===================== */
  readonly slot = input<TngSlotMap<TngBreadcrumbsSlot>>({});

  readonly containerClassFinal = computed(() =>
    this.toClassString(this.slotClass('container'), 'flex items-center text-sm text-muted-foreground'),
  );

  readonly listClassFinal = computed(() =>
    this.toClassString(this.slotClass('list'), 'flex items-center flex-wrap gap-1'),
  );

  readonly itemClassFinal = computed(() =>
    this.toClassString(this.slotClass('item'), 'inline-flex items-center'),
  );

  readonly linkClassFinal = computed(() =>
    this.toClassString(this.slotClass('link'), 'text-primary hover:underline'),
  );

  readonly currentClassFinal = computed(() =>
    this.toClassString(this.slotClass('current'), 'text-foreground font-medium'),
  );

  readonly disabledClassFinal = computed(() =>
    this.toClassString(this.slotClass('disabled'), 'opacity-60 pointer-events-none'),
  );

  readonly separatorClassFinal = computed(() =>
    this.toClassString(this.slotClass('separator'), 'mx-2 text-slate-400'),
  );

  /* =====================
   * Derived
   * ===================== */
  readonly resolvedItems = computed<TngBreadcrumbItem[]>(() => {
    const home = this.home();
    const items = this.items() ?? [];
    return home ? [home, ...items] : items;
  });

  readonly currentIndex = computed(() => {
    const items = this.resolvedItems();
    const explicit = items.findIndex((x) => !!x.current);
    return explicit >= 0 ? explicit : Math.max(0, items.length - 1);
  });

  isCurrent(i: number): boolean {
    return i === this.currentIndex();
  }

  isClickable(item: TngBreadcrumbItem, i: number): boolean {
    if (item.disabled) return false;
    if (this.isCurrent(i)) return false;
    return !!item.route || !!item.href;
  }

  itemClasses(item: TngBreadcrumbItem, i: number): string {
    const base = this.itemClassFinal();
    const disabled = item.disabled ? ` ${this.disabledClassFinal()}` : '';
    return `${base}${disabled}`.trim();
  }

  labelClasses(item: TngBreadcrumbItem, i: number): string {
    const isCurrent = this.isCurrent(i);
    return (isCurrent ? this.currentClassFinal() : this.linkClassFinal()).trim();
  }

  private slotClass(key: TngBreadcrumbsSlot): TngSlotValue {
    return this.slot()?.[key];
  }

  private toClassString(v: TngSlotValue, fallback: string): string {
    if (v == null || v === '') return fallback;
    if (Array.isArray(v)) return v.filter(Boolean).map(String).join(' ').trim() || fallback;
    return String(v).trim() || fallback;
  }

  relFor(item: TngBreadcrumbItem): string | null {
    if (!item.href) return null;
    if (item.rel) return item.rel;
    return item.target === '_blank' ? 'noopener noreferrer' : null;
  }
}
