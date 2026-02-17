import { Component, computed, input, signal } from '@angular/core';
import { TngSlotMap, TngSlotValue } from '@tailng-ui/ui';
import type { TngCopyButtonSlot } from './copy-button.slots';

type CopyButtonVariant = 'ghost' | 'outline' | 'solid';
type CopyButtonSize = 'sm' | 'md';

@Component({
  selector: 'tng-copy-button',
  standalone: true,
  templateUrl: './copy-button.component.html',
})
export class TngCopyButton {
  text = input.required<string>();

  variant = input<CopyButtonVariant>('ghost');
  size = input<CopyButtonSize>('sm');

  /** how long to show "copied" state */
  resetAfterMs = input<number>(1500);

  /** Slot hooks for micro-styling: container, content */
  readonly slot = input<TngSlotMap<TngCopyButtonSlot>>({});

  /* =====================
   * State
   * ===================== */

  copied = signal(false);
  private resetTimer: number | null = null;

  /* =====================
   * Defaults (internal)
   * ===================== */

  private readonly base = 'inline-flex items-center gap-1.5 font-medium transition select-none';
  private readonly sizes: Record<CopyButtonSize, string> = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };
  private readonly variants: Record<CopyButtonVariant, string> = {
    ghost: 'text-slate-600 hover:bg-slate-100',
    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50',
    solid: 'bg-primary text-white hover:opacity-90',
  };

  /* =====================
   * Final class (defaults + slot)
   * ===================== */

  private readonly defaultRootClass = computed(() =>
    [this.base, this.sizes[this.size()], this.variants[this.variant()]].join(' ')
  );

  readonly finalRootClass = computed(() => {
    const base = this.defaultRootClass();
    const slotExtra = this.toClassString(this.slotClass('container'), '');
    return [base, slotExtra].filter(Boolean).join(' ').trim() || base;
  });

  private readonly defaultContentClass = 'inline-flex items-center gap-1.5';

  readonly finalContentWrapClass = computed(() => {
    const base = this.defaultContentClass;
    const slotExtra = this.toClassString(this.slotClass('content'), '');
    return [base, slotExtra].filter(Boolean).join(' ').trim() || base;
  });

  private slotClass(key: TngCopyButtonSlot): TngSlotValue {
    return this.slot()?.[key];
  }

  private toClassString(v: TngSlotValue, fallback: string): string {
    if (v == null || v === '') return fallback;
    if (Array.isArray(v)) return v.filter(Boolean).map(String).join(' ').trim() || fallback;
    return String(v).trim() || fallback;
  }

  /* =====================
   * Actions
   * ===================== */

  async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.text());
      this.copied.set(true);

      if (this.resetTimer) window.clearTimeout(this.resetTimer);
      this.resetTimer = window.setTimeout(() => {
        this.copied.set(false);
        this.resetTimer = null;
      }, this.resetAfterMs());
    } catch {
      // clipboard may be blocked; ignore
    }
  }
}
