import {
  Component,
  ElementRef,
  ViewChild,
  effect,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { TailngConnectedOverlayComponent } from '../../../popups-overlays/connected-overlay/src/public-api';
import { TailngOptionListComponent } from '../../../popups-overlays/option-list/src/public-api';
import { TailngOverlayPanelComponent } from '../../../popups-overlays/overlay-panel/src/public-api';
import { handleListKeyboardEvent } from 'libs/cdk/keyboard/keyboard-navigation';

export type SelectCloseReason =
  | 'selection'
  | 'escape'
  | 'outside-click'
  | 'blur'
  | 'programmatic';

@Component({
  selector: 'tng-select',
  standalone: true,
  imports: [
    TailngConnectedOverlayComponent,
    TailngOverlayPanelComponent,
    TailngOptionListComponent,
  ],
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TailngSelectComponent),
      multi: true,
    },
  ],
})
export class TailngSelectComponent<T> implements ControlValueAccessor {
  @ViewChild('triggerEl', { static: true })
  triggerEl!: ElementRef<HTMLElement>;

  /* =====================
   * Inputs / Outputs
   * ===================== */
  options = input<T[]>([]);

  /**
   * Optional: non-forms usage.
   * If used with forms, DO NOT bind [value] / (selected) as the source of truth.
   */
  value = input<T | null>(null);

  placeholder = input<string>('Select…');

  /** External disabled input (read-only) */
  disabled = input<boolean>(false);

  displayWith = input<(item: T) => string>((v) => String(v));

  /** Optional: non-form usage hook */
  readonly selected = output<T>();

  readonly closed = output<SelectCloseReason>();

  /* =====================
   * State
   * ===================== */
  isOpen = signal(false);
  activeIndex = signal<number>(-1);

  /** eslint-safe + template-safe internal disabled state */
  protected isDisabled = signal(false);

  /** Authoritative selected value inside component */
  private selectedValue = signal<T | null>(null);

  /** When true, CVA owns the value (forms mode) */
  private usingCva = false;

  /* =====================
   * ControlValueAccessor
   * ===================== */
  private onChange: (value: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    // Sync external [disabled] -> internal
    effect(() => {
      this.isDisabled.set(this.disabled());
      if (this.isDisabled()) this.close('programmatic');
    });

    // Sync external [value] -> internal ONLY when NOT using CVA
    effect(() => {
      const v = this.value();
      if (this.usingCva) return;
      this.selectedValue.set(v);
    });
  }

  writeValue(value: T | null): void {
    this.usingCva = true;
    this.selectedValue.set(value);
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.usingCva = true;
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
    if (isDisabled) this.close('programmatic');
  }

  /* =====================
   * Helpers
   * ===================== */
  display(item: T | null): string {
    return item == null ? '' : this.displayWith()(item);
  }

  currentValue(): T | null {
    return this.selectedValue();
  }

  /* =====================
   * State transitions
   * ===================== */
  open(_reason: SelectCloseReason) {
    if (this.isDisabled()) return;

    this.isOpen.set(true);

    const current = this.selectedValue();
    if (current != null) {
      const idx = this.options().indexOf(current);
      this.activeIndex.set(idx >= 0 ? idx : 0);
    } else {
      this.activeIndex.set(this.options().length ? 0 : -1);
    }
  }

  close(reason: SelectCloseReason) {
    if (!this.isOpen()) return;

    this.isOpen.set(false);
    this.activeIndex.set(-1);
    this.closed.emit(reason);

    queueMicrotask(() => {
      this.triggerEl.nativeElement.focus();
    });
  }

  /* =====================
   * Overlay callback
   * ===================== */
  onOverlayClosed(reason: SelectCloseReason) {
    // outside-click / escape
    this.close(reason);
  }

  /* =====================
   * UI Events
   * ===================== */
  onTriggerClick() {
    if (this.isDisabled()) return;
    this.isOpen() ? this.close('programmatic') : this.open('programmatic');
  }

  onBlur() {
    this.onTouched();
    this.close('blur');
  }

  onKeydown(ev: KeyboardEvent) {
    if (this.isDisabled()) return;

    if (!this.isOpen() && (ev.key === 'ArrowDown' || ev.key === 'ArrowUp')) {
      ev.preventDefault();
      this.open('programmatic');
      return;
    }

    const action = handleListKeyboardEvent(ev, {
      activeIndex: this.activeIndex(),
      itemCount: this.options().length,
      loop: false,
    });

    switch (action.type) {
      case 'move':
        this.activeIndex.set(action.index);
        break;

      case 'select': {
        const item = this.options()[action.index];
        if (item !== undefined) this.select(item);
        break;
      }

      case 'close':
        this.close('escape');
        break;

      case 'noop':
      default:
        break;
    }
  }

  select(item: T) {
    if (this.isDisabled()) return;

    this.selectedValue.set(item);

    // ✅ propagate to forms
    this.onChange(item);
    this.onTouched();

    // optional non-form output
    this.selected.emit(item);

    this.close('selection');
  }
}
