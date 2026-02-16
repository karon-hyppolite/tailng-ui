import { Component, input, computed } from '@angular/core';
import { TngSlotMap, TngSlotValue } from '@tailng-ui/ui';

import { TngSidenavSlot } from './sidenav.slots';

@Component({
  selector: 'tng-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
})
export class TngSidenav {
  /* =====================
   * State
   * ===================== */
  readonly collapsed = input<boolean>(false);

  /* =====================
   * Slot hooks (micro styling)
   * ===================== */
  slot = input<TngSlotMap<TngSidenavSlot>>({});

  readonly containerClassFinal = computed(() =>
    this.cx(
      'group h-full bg-bg border-r border-border flex flex-col',
      'transition-[width] duration-200 ease-in-out will-change-[width]',
      this.slotClass('container'),
    ),
  );

  readonly expandedClassFinal = computed(() =>
    this.cx('w-64', this.slotClass('expanded')),
  );

  readonly collapsedClassFinal = computed(() =>
    this.cx('w-16', this.slotClass('collapsed')),
  );

  readonly contentClassFinal = computed(() =>
    this.cx('flex-1 overflow-auto', this.slotClass('content')),
  );

  readonly footerClassFinal = computed(() =>
    this.cx('border-t border-border', this.slotClass('footer')),
  );

  readonly containerClasses = computed(() =>
    [
      this.containerClassFinal(),
      this.collapsed() ? this.collapsedClassFinal() : this.expandedClassFinal(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  /**
   * Expose state as attribute for Tailwind selectors:
   * `data-[collapsed=true]:...`
   */
  readonly dataCollapsed = computed(() => (this.collapsed() ? 'true' : 'false'));

  private slotClass(key: TngSidenavSlot): TngSlotValue {
    return this.slot()?.[key];
  }

  private cx(...parts: Array<TngSlotValue>): string {
    return parts
      .flatMap((p) => (Array.isArray(p) ? p : [p]))
      .map((p) => (p ?? '').toString().trim())
      .filter(Boolean)
      .join(' ');
  }
}
