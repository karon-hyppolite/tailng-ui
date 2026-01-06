import { Component, computed, input, model } from '@angular/core';

@Component({
  selector: 'tng-input',
  standalone: true,
  templateUrl: './input.component.html',
})
export class TailngInputComponent {
  value = model<string>('');
  placeholder = input<string>('');
  disabled = input(false);
  type = input<string>('text');
  klass = input<string>('');

  classes = computed(
    () =>
      `h-10 w-full rounded-md border border-gray-300 px-3 text-sm ` +
      `focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary ` +
      `disabled:opacity-50 disabled:pointer-events-none ${this.klass()}`.trim(),
  );

  onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

}

