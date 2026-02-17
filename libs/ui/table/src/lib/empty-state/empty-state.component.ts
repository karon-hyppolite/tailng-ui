import { Component, computed, input } from '@angular/core';
import { TngSlotMap, TngSlotValue } from '@tailng-ui/ui';
import type { TngEmptyStateSlot } from './empty-state.slots';

@Component({
  selector: 'tng-empty-state',
  standalone: true,
  templateUrl: './empty-state.component.html',
})
export class TngEmptyState {
  title = input<string>('No data available');
  message = input<string>('');
  icon = input<string>('');

  /** Slot hooks for micro-styling: container, icon, title, message */
  readonly slot = input<TngSlotMap<TngEmptyStateSlot>>({});

  readonly containerClassFinal = computed(() => {
    const base = 'flex flex-col items-center justify-center p-8 text-center';
    const extra = this.toClassString(this.slotClass('container'), '');
    return [base, extra].filter(Boolean).join(' ').trim() || base;
  });
  readonly iconClassFinal = computed(() => {
    const base = 'mb-4 text-4xl text-muted';
    const extra = this.toClassString(this.slotClass('icon'), '');
    return [base, extra].filter(Boolean).join(' ').trim() || base;
  });
  readonly titleClassFinal = computed(() => {
    const base = 'text-lg font-semibold text-fg mb-2';
    const extra = this.toClassString(this.slotClass('title'), '');
    return [base, extra].filter(Boolean).join(' ').trim() || base;
  });
  readonly messageClassFinal = computed(() => {
    const base = 'text-sm text-muted';
    const extra = this.toClassString(this.slotClass('message'), '');
    return [base, extra].filter(Boolean).join(' ').trim() || base;
  });

  private slotClass(key: TngEmptyStateSlot): TngSlotValue {
    return this.slot()?.[key];
  }

  private toClassString(v: TngSlotValue, fallback: string): string {
    if (v == null || v === '') return fallback;
    if (Array.isArray(v)) return v.filter(Boolean).map(String).join(' ').trim() || fallback;
    return String(v).trim() || fallback;
  }
}
