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
  selector: 'docs-sort-header-api',
  templateUrl: './sort-header-api.component.html',
  imports: [TngCodeBlock, TngTable, TngCol],
})
export class SortHeaderApiComponent implements AfterViewInit {
  private shiki = inject(ShikiHighlighterService);
  readonly highlighter = new TngShikiAdapter(this.shiki);

  readonly importExample = computed(
    () => `import { TngSortHeaderDirective, TngSortIcon } from '@tailng-ui/ui/table';`
  );

  private readonly directiveSeed: DisplayDetails[] = [
    { property: 'colId', type: 'string', description: 'Column id (required). Must match a tng-col id.' },
    { property: 'direction', type: 'TngSortDir', description: 'Readonly. Current sort direction for this column: \'\' | \'asc\' | \'desc\'.' },
    { property: 'isSorted', type: 'boolean', description: 'Readonly. True when this column is the active sort column.' },
  ];

  readonly directiveRows = signal<DisplayDetails[]>(this.directiveSeed);

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
