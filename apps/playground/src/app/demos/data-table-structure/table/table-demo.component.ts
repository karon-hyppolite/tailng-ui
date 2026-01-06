import { Component } from '@angular/core';
import { TailngTableComponent } from '@tailng/ui';

@Component({
  selector: 'playground-table-demo',
  standalone: true,
  imports: [TailngTableComponent],
  templateUrl: './table-demo.component.html',
})
export class TableDemoComponent {}

