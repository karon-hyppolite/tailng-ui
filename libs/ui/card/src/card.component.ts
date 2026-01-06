import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'tng-card',
  standalone: true,
  templateUrl: './card.component.html',
})
export class TailngCardComponent {
  klass = input<string>('');
  classes = computed(() => `rounded-lg border border-gray-200 bg-white p-4 shadow-sm ${this.klass()}`.trim());
}
