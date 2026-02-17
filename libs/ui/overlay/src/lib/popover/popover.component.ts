import { Component, ContentChild, ElementRef, TemplateRef, ViewChild, computed, effect, input, output, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TngSlotMap, TngSlotValue } from '@tailng-ui/ui';

import { TngConnectedOverlay } from '../connected-overlay/connected-overlay.component';
import { TngOverlayPanel } from '../overlay-panel/overlay-panel.component';
import { TngOverlayRef } from '../overlay-ref/overlay-ref.component';
import { TngPopoverSlot } from './popover.slots';

export type TngPopoverPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
export type TngPopoverCloseReason = 'outside-click' | 'escape' | 'programmatic';

@Component({
  selector: 'tng-popover',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    TngConnectedOverlay,
    TngOverlayPanel,
    TngOverlayRef,
  ],
  templateUrl: './popover.component.html',
})
export class TngPopover {
  /* =====================
   * Slots
   * ===================== */
  @ContentChild('popoverContent', { read: TemplateRef })
  contentTpl?: TemplateRef<unknown>;

  @ViewChild('triggerEl', { static: true })
  triggerEl!: ElementRef<HTMLElement>;

  /* =====================
   * Inputs / outputs
   * ===================== */
  readonly open = input<boolean | null>(null); // optional controlled
  readonly placement = input<TngPopoverPlacement>('bottom-start');
  readonly offset = input<number>(6);
  readonly width = input<'anchor' | number>('anchor');

  readonly closeOnOutsideClick = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);

  /** Slot hooks (micro styling) */
  readonly slot = input<TngSlotMap<TngPopoverSlot>>({});

  readonly containerClassFinal = computed(() =>
    this.toClassString(this.slotClass('container'), 'relative inline-flex'),
  );
  readonly triggerClassFinal = computed(() =>
    this.toClassString(this.slotClass('trigger'), 'inline-flex'),
  );
  readonly panelClassFinal = computed(() =>
    this.toClassString(this.slotClass('panel'), 'p-2'),
  );
  readonly overlayPanelSlot = computed(() => ({ panel: this.panelClassFinal() }));

  readonly opened = output<void>();
  readonly closed = output<TngPopoverCloseReason>();
  readonly openChange = output<boolean>(); // for controlled usage if desired

  /* =====================
   * State
   * ===================== */
  private readonly internalOpen = signal(false);
  readonly isOpen = computed(() => (this.open() == null ? this.internalOpen() : !!this.open()));

  constructor() {
    // If externally controlled, keep internal in sync for animation consistency
    effect(() => {
      const ext = this.open();
      if (ext == null) return;
      this.internalOpen.set(!!ext);
    });
  }

  toggle() {
    this.isOpen() ? this.requestClose('programmatic') : this.requestOpen();
  }

  requestOpen() {
    if (this.isOpen()) return;
    if (this.open() == null) this.internalOpen.set(true);
    this.openChange.emit(true);
    this.opened.emit();
  }

  requestClose(reason: TngPopoverCloseReason) {
    if (!this.isOpen()) return;
    if (this.open() == null) this.internalOpen.set(false);
    this.openChange.emit(false);
    this.closed.emit(reason);
    queueMicrotask(() => this.triggerEl?.nativeElement?.focus());
  }

  onOverlayClosed(reason: any) {
    // Map connected-overlay reasons
    if (reason === 'escape') this.requestClose('escape');
    else if (reason === 'outside-click') this.requestClose('outside-click');
    else this.requestClose('programmatic');
  }

  onTriggerClick() {
    this.toggle();
  }

  private slotClass(key: TngPopoverSlot): TngSlotValue {
    return this.slot()?.[key];
  }

  private toClassString(v: TngSlotValue, fallback: string): string {
    if (v == null || v === '') return fallback;
    if (Array.isArray(v)) return v.filter(Boolean).map(String).join(' ').trim() || fallback;
    return String(v).trim() || fallback;
  }
}
