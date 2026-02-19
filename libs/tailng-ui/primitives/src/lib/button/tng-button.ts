import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';

type ButtonHostElement = HTMLAnchorElement | HTMLButtonElement;
type NullableBooleanInput = boolean | null | string | undefined;
export type TngAriaHasPopup =
  | 'dialog'
  | 'false'
  | 'grid'
  | 'listbox'
  | 'menu'
  | 'tree'
  | 'true';
export type TngButtonType = 'button' | 'reset' | 'submit';

const validAriaHasPopupValues: readonly TngAriaHasPopup[] = [
  'dialog',
  'false',
  'grid',
  'listbox',
  'menu',
  'tree',
  'true',
];

function coerceNullableBoolean(value: NullableBooleanInput): boolean | null {
  if (value === undefined || value === null) {
    return null;
  }

  if (value === '' || value === true || value === 'true') {
    return true;
  }

  if (value === false || value === 'false') {
    return false;
  }

  return null;
}

function coerceAriaHasPopup(value: boolean | null | string | undefined): TngAriaHasPopup | null {
  if (value === undefined || value === null) {
    return null;
  }

  if (value === true) {
    return 'true';
  }

  if (value === false) {
    return 'false';
  }

  const normalized = value.trim().toLowerCase();
  if (!isTngAriaHasPopup(normalized)) {
    return null;
  }

  return normalized;
}

function isActivationKey(key: string): boolean {
  return key === ' ' || key === 'Enter';
}

function isTngAriaHasPopup(value: string): value is TngAriaHasPopup {
  return validAriaHasPopupValues.includes(value as TngAriaHasPopup);
}

function normalizeStringValue(value: string | null | undefined): string | null {
  if (value === undefined || value === null) {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function toAriaBoolean(value: boolean | null): 'false' | 'true' | null {
  if (value === null) {
    return null;
  }

  return value ? 'true' : 'false';
}

@Directive({
  selector: 'a[tngButton], button[tngButton]',
  exportAs: 'tngButton',
})
export class TngButton {
  public readonly ariaControls = input<string | null>(null);
  public readonly ariaExpanded = input<boolean | null, NullableBooleanInput>(null, {
    transform: coerceNullableBoolean,
  });
  public readonly ariaHasPopup = input<
    TngAriaHasPopup | null,
    boolean | null | string | undefined
  >(null, {
    transform: coerceAriaHasPopup,
  });
  public readonly ariaPressed = input<boolean | null, NullableBooleanInput>(null, {
    transform: coerceNullableBoolean,
  });
  public readonly disabled = input<boolean, boolean | string>(false, {
    transform: booleanAttribute,
  });
  public readonly type = input<TngButtonType>('button');

  private readonly hostRef = inject<ElementRef<ButtonHostElement>>(ElementRef);

  @HostBinding('attr.aria-controls')
  protected get ariaControlsAttr(): string | null {
    return normalizeStringValue(this.ariaControls());
  }

  @HostBinding('attr.aria-disabled')
  protected get ariaDisabledAttr(): 'true' | null {
    if (this.isNativeButton()) {
      return null;
    }

    return this.disabled() ? 'true' : null;
  }

  @HostBinding('attr.aria-expanded')
  protected get ariaExpandedAttr(): 'false' | 'true' | null {
    return toAriaBoolean(this.ariaExpanded());
  }

  @HostBinding('attr.aria-haspopup')
  protected get ariaHasPopupAttr(): TngAriaHasPopup | null {
    return this.ariaHasPopup();
  }

  @HostBinding('attr.aria-pressed')
  protected get ariaPressedAttr(): 'false' | 'true' | null {
    return toAriaBoolean(this.ariaPressed());
  }

  @HostBinding('attr.data-disabled')
  protected get dataDisabledAttr(): '' | null {
    return this.disabled() ? '' : null;
  }

  @HostBinding('attr.disabled')
  protected get disabledAttr(): '' | null {
    if (!this.isNativeButton()) {
      return null;
    }

    return this.disabled() ? '' : null;
  }

  @HostBinding('attr.role')
  protected get roleAttr(): 'button' | null {
    return this.isAnchorWithoutHref() ? 'button' : null;
  }

  @HostBinding('attr.tabindex')
  protected get tabIndexAttr(): -1 | 0 | null {
    if (!this.isAnchorHost()) {
      return null;
    }

    if (this.disabled()) {
      return -1;
    }

    return this.hasHref() ? null : 0;
  }

  @HostBinding('attr.type')
  protected get typeAttr(): TngButtonType | null {
    return this.isNativeButton() ? this.type() : null;
  }

  @HostListener('click', ['$event'])
  protected onHostClick(...args: readonly unknown[]): void {
    if (!this.disabled()) {
      return;
    }

    const [event] = args;
    if (!(event instanceof Event)) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
  }

  @HostListener('keydown', ['$event'])
  protected onHostKeyDown(...args: readonly unknown[]): void {
    if (!this.isAnchorWithoutHref()) {
      return;
    }

    const [event] = args;
    if (!(event instanceof KeyboardEvent)) {
      return;
    }

    if (!isActivationKey(event.key)) {
      return;
    }

    event.preventDefault();
    if (this.disabled()) {
      return;
    }

    this.hostElement.click();
  }

  private get hostElement(): ButtonHostElement {
    return this.hostRef.nativeElement;
  }

  private hasHref(): boolean {
    return this.hostElement.hasAttribute('href');
  }

  private isAnchorHost(): boolean {
    return this.hostElement.tagName === 'A';
  }

  private isAnchorWithoutHref(): boolean {
    if (!this.isAnchorHost()) {
      return false;
    }

    return !this.hasHref();
  }

  private isNativeButton(): boolean {
    return this.hostElement.tagName === 'BUTTON';
  }
}
