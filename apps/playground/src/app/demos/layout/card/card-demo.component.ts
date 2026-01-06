import { Component } from '@angular/core';
import { TailngCardComponent } from '@tailng/ui';
import { TailngIconComponent } from '@tailng/icons';

@Component({
  selector: 'playground-card-demo',
  standalone: true,
  imports: [TailngCardComponent, TailngIconComponent],
  templateUrl: './card-demo.component.html',
})
export class CardDemoComponent {}

