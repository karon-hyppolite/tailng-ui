import { Component } from '@angular/core';
import { TailngPaginatorComponent } from '@tailng/ui';

@Component({
  selector: 'playground-paginator-demo',
  standalone: true,
  imports: [TailngPaginatorComponent],
  templateUrl: './paginator-demo.component.html',
})
export class PaginatorDemoComponent {}

