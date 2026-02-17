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
  selector: 'docs-empty-state-api',
  templateUrl: './empty-state-api.component.html',
  imports: [TngCodeBlock, TngTable, TngCol],
})
export class EmptyStateApiComponent implements AfterViewInit {
  private shiki = inject(ShikiHighlighterService);
  readonly highlighter = new TngShikiAdapter(this.shiki);

  readonly importExample = computed(
    () => `import { TngEmptyState } from '@tailng-ui/ui/table';`
  );

  private readonly inputsSeed: DisplayDetails[] = [
    { property: 'title', type: 'string', default: "'No data available'", description: 'Heading shown in the empty state.' },
    { property: 'message', type: 'string', default: "''", description: 'Optional body text below the title.' },
    { property: 'icon', type: 'string', default: "''", description: 'Optional icon or emoji (e.g. 📭 or icon character) shown above the title.' },
    { property: 'slot', type: 'TngSlotMap<TngEmptyStateSlot>', default: '{}', description: 'Micro-styling: container, icon, title, message. Classes are merged with defaults. See Styling.' },
  ];

  readonly inputRows = signal<DisplayDetails[]>(this.inputsSeed);

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
