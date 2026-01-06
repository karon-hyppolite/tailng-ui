import { Component } from '@angular/core';
import { TailngSidenavComponent } from '@tailng/ui';

@Component({
  selector: 'playground-sidenav-demo',
  standalone: true,
  imports: [TailngSidenavComponent],
  templateUrl: './sidenav-demo.component.html',
})
export class SidenavDemoComponent {}

