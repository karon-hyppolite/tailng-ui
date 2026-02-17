import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  computed,
  signal,
} from '@angular/core';
import { booleanAttribute } from '@angular/core';
import { TngSlotMap, TngSlotValue } from '@tailng-ui/ui';
import { TngStepper } from './stepper.component';
import { TngStepSlot } from './step.slots';

@Component({
  selector: 'tng-step',
  standalone: true,
  template: `<ng-content />`,
})
export class TngStep {
  private readonly stepper = inject(TngStepper);
  private readonly el = inject(ElementRef<HTMLElement>);

  /* =====================
   * Inputs
   * ===================== */

  /** Optional label (you can also project content) */
  label = input<string>('');

  /** Disable this step */
  disabled = input(false, { transform: booleanAttribute });

  /** Mark as complete (used by linear mode to allow forward navigation) */
  complete = input(false, { transform: booleanAttribute });

  /* =====================
   * Slot hooks (micro styling)
   * ===================== */

  slot = input<TngSlotMap<TngStepSlot>>({});

  /* =====================
   * Internal
   * ===================== */

  private readonly focused = signal(false);

  isComplete(): boolean {
    return this.complete();
  }

  isFocused(): boolean {
    return this.focused();
  }

  focus(): void {
    this.el.nativeElement.focus();
  }

  /* =====================
   * Host bindings
   * ===================== */

  @HostBinding('attr.role') role = 'tab';

  @HostBinding('attr.tabindex')
  get tabindex() {
    // roving tabindex: active is focusable by default, others -1
    return this.stepper.isActive(this.index()) ? 0 : -1;
  }

  @HostBinding('attr.aria-selected')
  get selected() {
    return this.stepper.isActive(this.index());
  }

  @HostBinding('attr.aria-disabled')
  get ariaDisabled() {
    return this.disabled() ? 'true' : null;
  }

  @HostBinding('class')
  get hostClass() {
    const step = this.slotClass('step') || 'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium border border-transparent';
    const disabled = this.slotClass('disabled') || 'opacity-50 cursor-not-allowed';
    const active = this.slotClass('active') || 'bg-primary text-on-primary';
    const inactive = this.slotClass('inactive') || 'bg-bg text-muted-foreground hover:text-foreground hover:bg-slate-50';

    if (this.disabled()) return `${step} ${disabled}`.trim();
    return this.stepper.isActive(this.index())
      ? `${step} ${active}`.trim()
      : `${step} ${inactive}`.trim();
  }

  private slotClass(key: TngStepSlot): TngSlotValue {
    return this.slot()?.[key];
  }

  /* =====================
   * Index resolution
   * ===================== */

  readonly index = computed(() => {
    const steps = this.stepper.steps();
    return steps.indexOf(this);
  });

  /* =====================
   * Events
   * ===================== */

  @HostListener('click')
  onClick(): void {
    if (this.disabled()) return;
    this.stepper.setIndex(this.index());
  }

  @HostListener('focus')
  onFocus(): void {
    this.focused.set(true);
  }

  @HostListener('blur')
  onBlur(): void {
    this.focused.set(false);
  }
}
