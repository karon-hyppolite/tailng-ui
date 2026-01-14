import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'tng-copy-button',
  standalone: true,
  templateUrl: './copy-button.component.html',
})
export class TailngCopyButtonComponent {
  text = input.required<string>();
  size = input<'sm' | 'md' | 'lg'>('md');
  variant = input<'solid' | 'outline' | 'ghost'>('solid');
  showIcon = input(true);
  showLabel = input(true);
  ariaLabel = input<string>('Copy to clipboard');
  klass = input<string>('');

  copied = output<string>();

  readonly classes = computed(() => {
    const sizeClasses = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-3 text-base',
    };

    const variantClasses = {
      solid: 'bg-primary text-on-primary hover:bg-primary-hover border-primary',
      outline: 'bg-transparent text-primary border-primary hover:bg-primary/10',
      ghost: 'bg-transparent text-text border-transparent hover:bg-alternate-background',
    };

    return `${sizeClasses[this.size()]} ${variantClasses[this.variant()]} ${this.klass()}`.trim();
  });

  async handleClick() {
    try {
      await navigator.clipboard.writeText(this.text());
      this.copied.emit(this.text());
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }
}
