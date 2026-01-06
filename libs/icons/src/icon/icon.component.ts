import { Component, computed, input } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'tng-icon',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './icon.component.html',
})
export class TailngIconComponent {
  name = input.required<string>();
  size = input<string | number>('1em');
  klass = input<string>('');
  classes = computed(() => `inline-flex align-middle ${this.klass()}`.trim());
}
