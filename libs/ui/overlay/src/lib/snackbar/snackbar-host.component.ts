import { Component, computed, effect, input, output, signal } from '@angular/core';
import { TngSlotMap, TngSlotValue } from '@tailng-ui/ui';
import { TngSnackbarItem, TngSnackbarIntent } from './snackbar.types';
import { TngSnackbarSlot } from './snackbar.slots';

export type TngSnackbarPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

@Component({
  selector: 'tng-snackbar-host',
  standalone: true,
  templateUrl: './snackbar-host.component.html',
})
export class TngSnackbarHost {
  /** Controlled items array */
  readonly items = input<TngSnackbarItem[]>([]);

  /** Placement on screen */
  readonly position = input<TngSnackbarPosition>('bottom-center');

  /** Max stack size (visual). Consumer should also enforce if desired. */
  readonly max = input<number>(3);

  /** Outputs */
  readonly dismiss = output<{ id: string; reason: 'timeout' | 'dismiss' | 'action' }>();

  /* =====================
   * Slot hooks (micro styling)
   * ===================== */
  readonly slot = input<TngSlotMap<TngSnackbarSlot>>({});

  readonly hostClassFinal = computed(() =>
    this.toClassString(this.slotClass('host'), 'fixed z-[1100] flex flex-col gap-2 p-4'),
  );

  readonly itemClassFinal = computed(() =>
    this.toClassString(
      this.slotClass('item'),
      'pointer-events-auto w-[min(28rem,calc(100vw-2rem))] rounded-md border border-border bg-bg shadow-lg',
    ),
  );

  readonly itemInnerClassFinal = computed(() =>
    this.toClassString(this.slotClass('itemInner'), 'flex items-start gap-3 px-4 py-3'),
  );

  readonly messageClassFinal = computed(() =>
    this.toClassString(this.slotClass('message'), 'text-sm text-foreground'),
  );

  readonly actionClassFinal = computed(() =>
    this.toClassString(this.slotClass('action'), 'text-sm font-medium text-primary hover:underline'),
  );

  readonly dismissBtnClassFinal = computed(() =>
    this.toClassString(this.slotClass('dismissBtn'), 'text-muted-foreground hover:text-foreground'),
  );

  /* =====================
   * Derived / internal
   * ===================== */
  readonly hostPositionClass = computed(() => {
    const base = this.hostClassFinal();
    switch (this.position()) {
      case 'top-left':
        return `${base} top-0 left-0 items-start`;
      case 'top-center':
        return `${base} top-0 left-1/2 -translate-x-1/2 items-center`;
      case 'top-right':
        return `${base} top-0 right-0 items-end`;
      case 'bottom-left':
        return `${base} bottom-0 left-0 items-start`;
      case 'bottom-center':
        return `${base} bottom-0 left-1/2 -translate-x-1/2 items-center`;
      case 'bottom-right':
        return `${base} bottom-0 right-0 items-end`;
    }
  });

  /** Track which ids have active timers */
  private readonly timers = new Map<string, number>();

  constructor() {
    effect(() => {
      const incoming = (this.items() ?? []).slice(0, Math.max(1, this.max()));

      // Start timers for new items with duration
      for (const item of incoming) {
        const dur = item.durationMs ?? 0;
        if (dur > 0 && !this.timers.has(item.id)) {
          const t = window.setTimeout(() => {
            this.timers.delete(item.id);
            this.dismiss.emit({ id: item.id, reason: 'timeout' });
          }, dur);
          this.timers.set(item.id, t);
        }
      }

      // Clear timers for removed items
      const ids = new Set(incoming.map((x) => x.id));
      for (const [id, t] of Array.from(this.timers.entries())) {
        if (!ids.has(id)) {
          window.clearTimeout(t);
          this.timers.delete(id);
        }
      }
    });
  }

  itemClasses(item: TngSnackbarItem): string {
    const intent = item.intent ?? 'default';
    const intentCls = this.intentClassFor(intent);
    return `${this.itemClassFinal()} ${intentCls}`.trim();
  }

  private slotClass(key: TngSnackbarSlot): TngSlotValue {
    return this.slot()?.[key];
  }

  private intentClassFor(intent: TngSnackbarIntent): string {
    const key: TngSnackbarSlot | null =
      intent === 'success' ? 'intentSuccess' :
      intent === 'info' ? 'intentInfo' :
      intent === 'warning' ? 'intentWarning' :
      intent === 'error' ? 'intentError' : null;
    if (!key) return '';
    return this.toClassString(this.slotClass(key), this.defaultIntentClass(intent));
  }

  private defaultIntentClass(intent: TngSnackbarIntent): string {
    switch (intent) {
      case 'success': return 'border-success/30';
      case 'info': return 'border-info/30';
      case 'warning': return 'border-warning/30';
      case 'error': return 'border-danger/30';
      default: return '';
    }
  }

  private toClassString(v: TngSlotValue, fallback: string): string {
    if (v == null || v === '') return fallback;
    if (Array.isArray(v)) return v.filter(Boolean).map(String).join(' ').trim() || fallback;
    return String(v).trim() || fallback;
  }

  onDismiss(id: string) {
    const t = this.timers.get(id);
    if (t != null) {
      window.clearTimeout(t);
      this.timers.delete(id);
    }
    this.dismiss.emit({ id, reason: 'dismiss' });
  }

  onAction(id: string) {
    const t = this.timers.get(id);
    if (t != null) {
      window.clearTimeout(t);
      this.timers.delete(id);
    }
    this.dismiss.emit({ id, reason: 'action' });
  }
}
