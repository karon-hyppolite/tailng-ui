import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  computed,
  inject,
  input,
} from '@angular/core';
import type { TngSlotMap } from '@tailng-ui/ui';
import { TNG_TABLE } from '../core/tokens/table.token';
import type { TngFilterPanelSlot } from '../ui/filter/filter-panel.slots';

@Directive({
  selector: '[tngFilterTrigger]',
  standalone: true,
})
export class TngFilterTrigger {
  readonly colId = input.required<string>();

  private readonly table = inject(TNG_TABLE);
  private readonly el = inject(ElementRef<HTMLElement>);

  /** Slot hooks for the filter panel overlay */
  readonly slot = input<TngSlotMap<TngFilterPanelSlot>>({});

  readonly isFiltered = computed(() => this.table.isFiltered(this.colId()));
  readonly isOpen = computed(() => this.table.isFilterOpenFor(this.colId()));

  // a11y
  @HostBinding('attr.role') role = 'button';
  @HostBinding('attr.tabindex') tabindex = 0;
  @HostBinding('attr.aria-haspopup') ariaHaspopup: 'dialog' | 'menu' = 'dialog';

  @HostBinding('attr.aria-expanded')
  get ariaExpanded(): 'true' | 'false' {
    return this.isOpen() ? 'true' : 'false';
  }

  @HostListener('click')
  onClick(): void {
    this.table.setFilterPanelSlot(this.slot()); // store it
    this.table.toggleFilter(this.colId(), this.el.nativeElement);
  }

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  onKey(ev: KeyboardEvent): void {
    ev.preventDefault();
    this.table.setFilterPanelSlot(this.slot()); // store it
    this.table.toggleFilter(this.colId(), this.el.nativeElement);
  }
}
