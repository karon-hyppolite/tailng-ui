import { Component } from '@angular/core';
import { TailngTreeComponent } from '@tociva/tailng-ui/data-table-structure';

@Component({
  selector: 'playground-tree-demo',
  standalone: true,
  imports: [TailngTreeComponent],
  templateUrl: './tree-demo.component.html',
})
export class TreeDemoComponent {}

