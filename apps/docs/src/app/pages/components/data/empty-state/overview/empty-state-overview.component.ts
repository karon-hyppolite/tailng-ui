import { Component, computed } from '@angular/core';
import { TngEmptyState } from '@tailng-ui/ui/table';
import {
  ExampleBlockComponent,
  TngExampleDemo,
  TngExampleTitle,
} from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-empty-state-overview',
  templateUrl: './empty-state-overview.component.html',
  imports: [TngEmptyState, ExampleBlockComponent, TngExampleDemo, TngExampleTitle],
})
export class EmptyStateOverviewComponent {
  readonly quickExampleHtml = computed(
    () => `<tng-empty-state
  title="No items found"
  message="Try adjusting your search or filters."
></tng-empty-state>`,
  );
}
