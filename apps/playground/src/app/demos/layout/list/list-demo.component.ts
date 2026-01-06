import { Component } from '@angular/core';
import { TailngListComponent } from '@tailng/ui';

@Component({
  selector: 'playground-list-demo',
  standalone: true,
  imports: [TailngListComponent],
  templateUrl: './list-demo.component.html',
})
export class ListDemoComponent {}

