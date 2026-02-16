import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { TngCol, TngTable } from '@tailng-ui/ui/table';
import { TngCodeBlock } from '@tailng-ui/ui/utilities';
import { ShikiHighlighterService } from '../../../../../shared/shiki-highlighter.service';
import { TngShikiAdapter } from '../../../../../shared/tng-shiki.adapter';

type DisplayDetails = { property: string; type: string; default?: string; description: string };

@Component({
  standalone: true,
  selector: 'docs-snackbar-api',
  templateUrl: './snackbar-api.component.html',
  imports: [TngCodeBlock, TngTable, TngCol],
})
export class SnackbarApiComponent implements AfterViewInit {
  private shiki = inject(ShikiHighlighterService);
  readonly highlighter = new TngShikiAdapter(this.shiki);
  readonly importExample = () =>
    `import { TngSnackbarHost, TngSnackbarItem, TngSnackbarIntent } from '@tailng-ui/ui/overlay';`;

  private readonly inputSeed: DisplayDetails[] = [
    { property: 'items', type: 'TngSnackbarItem[]', default: '[]', description: 'Controlled list of snackbar items' },
    { property: 'position', type: 'TngSnackbarPosition', default: "'bottom-center'", description: 'top-left | top-center | top-right | bottom-left | bottom-center | bottom-right' },
    { property: 'max', type: 'number', default: '3', description: 'Max number of items shown at once' },
  ];
  private readonly outputSeed: DisplayDetails[] = [
    { property: 'dismiss', type: '{ id: string; reason: "timeout" | "dismiss" | "action" }', description: 'Emitted when an item is removed (timeout, dismiss button, or action button)' },
  ];
  private readonly itemSeed: DisplayDetails[] = [
    { property: 'id', type: 'string', description: 'Unique id for the item' },
    { property: 'message', type: 'string', description: 'Message text' },
    { property: 'intent', type: 'TngSnackbarIntent', description: 'default | success | info | warning | error' },
    { property: 'actionLabel', type: 'string', description: 'Optional action button label' },
    { property: 'durationMs', type: 'number', description: 'Auto-dismiss delay (ms); 0 or undefined = no auto-dismiss' },
  ];
  private readonly slotSeed: DisplayDetails[] = [
    { property: 'slot', type: 'TngSlotMap<TngSnackbarSlot>', default: '{}', description: 'Slot-based micro styling' },
    { property: 'slot.host', type: 'string', default: "'fixed z-[1100] flex flex-col...'", description: 'Host container' },
    { property: 'slot.item', type: 'string', default: "'pointer-events-auto w-[min(28rem,...)]...'", description: 'Each snackbar item' },
    { property: 'slot.itemInner', type: 'string', default: "'flex items-start gap-3 px-4 py-3'", description: 'Inner content row' },
    { property: 'slot.message', type: 'string', default: "'text-sm text-foreground'", description: 'Message text' },
    { property: 'slot.action', type: 'string', default: "'text-sm font-medium text-primary...'", description: 'Action button' },
    { property: 'slot.dismissBtn', type: 'string', default: "'text-muted-foreground...'", description: 'Dismiss (×) button' },
    { property: 'slot.intentSuccess', type: 'string', default: "'border-success/30'", description: 'Extra class when intent=success' },
    { property: 'slot.intentInfo', type: 'string', default: "'border-info/30'", description: 'Extra class when intent=info' },
    { property: 'slot.intentWarning', type: 'string', default: "'border-warning/30'", description: 'Extra class when intent=warning' },
    { property: 'slot.intentError', type: 'string', default: "'border-danger/30'", description: 'Extra class when intent=error' },
  ];

  readonly inputRows = signal<DisplayDetails[]>(this.inputSeed);
  readonly outputRows = signal<DisplayDetails[]>(this.outputSeed);
  readonly itemRows = signal<DisplayDetails[]>(this.itemSeed);
  readonly slotRows = signal<DisplayDetails[]>(this.slotSeed);
  readonly property = (r: DisplayDetails) => r.property;
  readonly type = (r: DisplayDetails) => r.type;
  readonly default = (r: DisplayDetails) => r.default ?? '—';
  readonly description = (r: DisplayDetails) => r.description;

  ngAfterViewInit() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const links = document.querySelectorAll('.scroll-link');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          const link = document.querySelector(`.scroll-link[href="#${id}"]`);
          if (entry.isIntersecting) {
            links.forEach((l) => l.classList.remove('text-blue-500', 'font-semibold'));
            link?.classList.add('text-blue-500', 'font-semibold');
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
  }
}
