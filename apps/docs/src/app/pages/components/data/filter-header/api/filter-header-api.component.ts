import { AfterViewInit, Component, computed, inject, signal } from '@angular/core';
import { TngCodeBlock } from '@tailng-ui/ui/utilities';
import { TngTable, TngCol } from '@tailng-ui/ui/table';
import { ShikiHighlighterService } from '../../../../../shared/shiki-highlighter.service';
import { TngShikiAdapter } from '../../../../../shared/tng-shiki.adapter';

type DisplayDetails = {
  property: string;
  type: string;
  default?: string;
  description: string;
};

@Component({
  standalone: true,
  selector: 'docs-filter-header-api',
  templateUrl: './filter-header-api.component.html',
  imports: [TngCodeBlock, TngTable, TngCol],
})
export class FilterHeaderApiComponent implements AfterViewInit {
  private shiki = inject(ShikiHighlighterService);
  readonly highlighter = new TngShikiAdapter(this.shiki);

  readonly importExample = computed(
    () => `import { TngHeaderDef, TngFilterTrigger, TngFilterPanel, TngSortHeaderDirective } from '@tailng-ui/ui/table';`
  );

  private readonly headerSeed: DisplayDetails[] = [
    { property: 'colId', type: 'string', description: 'Column id (from parent tng-col).' },
    { property: 'header', type: 'string', description: 'Header label (from tng-col header input).' },
  ];

  private readonly triggerSeed: DisplayDetails[] = [
    { property: 'colId', type: 'string', description: 'Column id (required). Must match a tng-col id with [filter].' },
    { property: 'slot', type: 'TngSlotMap<TngFilterPanelSlot>', default: '{}', description: 'Panel slot: { panel: string }. See Filter Panel docs.' },
  ];

  private readonly colFilterSeed: DisplayDetails[] = [
    { property: 'filter', type: 'TngColumnFilterMeta | null', default: 'null', description: 'Filter config: { type: \'text\', placeholder? } | { type: \'number\' } | { type: \'date\' } | { type: \'enum\', options }.' },
  ];

  readonly headerRows = signal<DisplayDetails[]>(this.headerSeed);
  readonly triggerRows = signal<DisplayDetails[]>(this.triggerSeed);
  readonly colFilterRows = signal<DisplayDetails[]>(this.colFilterSeed);

  readonly property = (r: DisplayDetails) => r.property;
  readonly type = (r: DisplayDetails) => r.type;
  readonly default = (r: DisplayDetails) => r.default ?? '—';
  readonly description = (r: DisplayDetails) => r.description;

  ngAfterViewInit() {
    const sections = document.querySelectorAll('section[id]');
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
      { rootMargin: '-50% 0px -50% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
  }
}
