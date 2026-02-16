import { Component, computed, signal } from '@angular/core';
import { TngSidenav, TngSidenavFooterSlot, TngSidenavHeaderSlot } from '@tailng-ui/ui/navigation';
import { TngTag } from '@tailng-ui/ui/primitives';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-sidenav-styling',
  templateUrl: './sidenav-styling.component.html',
  imports: [TngSidenav, TngSidenavHeaderSlot, TngSidenavFooterSlot, TngTag, ExampleBlockComponent, TngExampleDemo],
})
export class SidenavStylingComponent {
  readonly collapsed = signal(false);
  readonly containerSlotHtml = computed(
    () => `<tng-sidenav [slot]="{ container: '...' }">...</tng-sidenav>`,
  );
  readonly expandedSlotHtml = computed(
    () => `<tng-sidenav [slot]="{ expanded: 'w-48' }">...</tng-sidenav>`,
  );
  readonly collapsedSlotHtml = computed(
    () => `<tng-sidenav [slot]="{ collapsed: 'w-14' }">...</tng-sidenav>`,
  );
  readonly contentSlotHtml = computed(
    () => `<tng-sidenav [slot]="{ content: 'flex-1 overflow-y-auto' }">...</tng-sidenav>`,
  );
  readonly footerSlotHtml = computed(
    () => `<tng-sidenav [slot]="{ footer: 'border-t border-primary/20' }">...</tng-sidenav>`,
  );
  readonly widthHtml = computed(
    () => `<tng-sidenav [collapsed]="collapsed()" [slot]="{ expanded: 'w-48', collapsed: 'w-14' }">...</tng-sidenav>`,
  );
}
