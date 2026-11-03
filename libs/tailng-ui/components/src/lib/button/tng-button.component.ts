import { booleanAttribute, Component, input } from '@angular/core';
import {
  coerceTngButtonAriaHasPopup,
  coerceTngButtonNullableBoolean,
  TngButton as TngButtonPrimitive,
} from '@tailng-ui/primitives';
import type { TngAriaHasPopup, TngButtonType } from '@tailng-ui/primitives';

export { coerceTngButtonAriaHasPopup, coerceTngButtonNullableBoolean };

type NullableBooleanInput = boolean | null | string | undefined;
export type TngButtonAppearance = 'ghost' | 'outline' | 'solid';
export type TngButtonSize = 'lg' | 'md' | 'sm';
export type TngButtonTone = 'danger' | 'neutral' | 'primary' | 'success';

@Component({
  selector: 'tng-button',
  imports: [TngButtonPrimitive],
  templateUrl: './tng-button.component.html',
  styleUrl: './tng-button.component.css',
})
export class TngButton {
  public readonly appearance = input<TngButtonAppearance>('solid');
  public readonly ariaControls = input<string | null>(null);
  public readonly ariaExpanded = input<boolean | null, NullableBooleanInput>(null, {
    transform: coerceTngButtonNullableBoolean,
  });
  public readonly ariaHasPopup = input<
    TngAriaHasPopup | null,
    boolean | null | string | undefined
  >(null, {
    transform: coerceTngButtonAriaHasPopup,
  });
  public readonly ariaPressed = input<boolean | null, NullableBooleanInput>(null, {
    transform: coerceTngButtonNullableBoolean,
  });
  public readonly disabled = input<boolean, boolean | string>(false, {
    transform: booleanAttribute,
  });
  public readonly size = input<TngButtonSize>('md');
  public readonly tone = input<TngButtonTone>('primary');
  public readonly type = input<TngButtonType>('button');
}
