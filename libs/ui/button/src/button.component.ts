import { Component, computed, input } from '@angular/core';
import type { TailngButtonSize, TailngButtonVariant } from './button.types';
import { buttonClasses } from './button.variants';

@Component({
  selector: 'tng-button',
  standalone: true,
  templateUrl: './button.component.html',
})
export class TailngButtonComponent {
  variant = input<TailngButtonVariant>('solid');
  size = input<TailngButtonSize>('md');
  disabled = input(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  klass = input<string>('');

  classes = computed(() => `${buttonClasses(this.variant(), this.size())} ${this.klass()}`.trim());
}
