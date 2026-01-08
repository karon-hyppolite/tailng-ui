import {
  Component,
  Directive,
  computed,
  contentChild,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { booleanAttribute } from '@angular/core';

/**
 * Marker directive for projected custom icon.
 * IMPORTANT:
 * This directive must be imported by the CONSUMER component (the one that writes
 * <svg tngExpansionIcon>...</svg>) so Angular can attach it to that element.
 */
@Directive({
  selector: '[tngExpansionIcon]',
  standalone: true,
})
export class TailngExpansionIconDirective {}

@Component({
  selector: 'tng-expansion-panel',
  standalone: true,
  templateUrl: './expansion-panel.component.html',
})
export class TailngExpansionPanelComponent {
  /* =====================
   * Inputs
   * ===================== */

  /** Initial open state (uncontrolled default) */
  open = input(false, { transform: booleanAttribute });

  /** Disable interaction */
  disabled = input(false, { transform: booleanAttribute });

  /** Add internal padding to content */
  padded = input(true, { transform: booleanAttribute });

  /* =====================
   * Outputs (optional feature)
   * ===================== */

  /** Emits whenever user toggles */
  openChange = output<boolean>();

  /* =====================
   * Klass hooks (theming)
   * ===================== */

  rootKlass = input<string>('rounded-lg border border-border bg-background');

  headerKlass = input<string>(
    'flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-foreground ' +
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ' +
      'disabled:cursor-not-allowed disabled:opacity-60'
  );

  titleKlass = input<string>('flex-1');

  iconWrapperKlass = input<string>('ml-2 shrink-0 inline-flex items-center justify-center');

  chevronKlass = input<string>('h-4 w-4 shrink-0 transition-transform duration-200');

  contentOuterKlass = input<string>(
    'grid transition-[grid-template-rows] duration-200 ease-in-out'
  );

  contentClipKlass = input<string>('overflow-hidden');
  contentBodyKlass = input<string>('text-sm text-muted-foreground');
  contentPaddingKlass = input<string>('px-4 pb-4 pt-2');

  /* =====================
   * Slots
   * ===================== */

  /** Detects presence of a projected element with [tngExpansionIcon] */
  readonly iconSlot = contentChild(TailngExpansionIconDirective);
  readonly hasCustomIcon = computed(() => !!this.iconSlot());

  /* =====================
   * State
   * ===================== */

  private readonly _isOpen = signal(false);
  readonly isOpen = this._isOpen.asReadonly();

  constructor() {
    effect(() => {
      this._isOpen.set(this.open());
    });
  }

  toggle(): void {
    if (this.disabled()) return;
    const next = !this._isOpen();
    this._isOpen.set(next);
    this.openChange.emit(next);
  }

  /* =====================
   * Computed
   * ===================== */

  readonly contentRowsKlass = computed(() =>
    this.isOpen() ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
  );

  readonly chevronRotateKlass = computed(() => (this.isOpen() ? 'rotate-180' : ''));

  readonly resolvedContentBodyKlass = computed(() => {
    const pad = this.padded() ? this.contentPaddingKlass() : '';
    return `${this.contentBodyKlass()} ${pad}`.trim();
  });
}
