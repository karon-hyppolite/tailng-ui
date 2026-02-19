import { booleanAttribute, Component, input } from '@angular/core';
import { TngButton } from '@tailng-ui/primitives';
import type { TngAriaHasPopup, TngButtonType } from '@tailng-ui/primitives';

type NullableBooleanInput = boolean | null | string | undefined;
export type TngButtonAppearance = 'ghost' | 'outline' | 'solid';
export type TngButtonSize = 'lg' | 'md' | 'sm';
export type TngButtonTone = 'danger' | 'neutral' | 'primary' | 'success';

const validAriaHasPopupValues: readonly TngAriaHasPopup[] = [
  'dialog',
  'false',
  'grid',
  'listbox',
  'menu',
  'tree',
  'true',
];

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

function isTngAriaHasPopup(value: string): value is TngAriaHasPopup {
  return validAriaHasPopupValues.includes(value as TngAriaHasPopup);
}

@Component({
  selector: 'tng-button',
  imports: [TngButton],
  templateUrl: './tng-button.component.html',
  styleUrl: './tng-button.component.css',
})
export class TngButtonComponent {
  public readonly appearance = input<TngButtonAppearance>('solid');
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
  public readonly size = input<TngButtonSize>('md');
  public readonly tone = input<TngButtonTone>('primary');
  public readonly type = input<TngButtonType>('button');
}
