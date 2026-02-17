import { Component, computed } from '@angular/core';
import { TngEmptyState } from '@tailng-ui/ui/table';
import {
  ExampleBlockComponent,
  TngExampleDemo,
  TngExampleTitle,
} from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-empty-state-examples',
  templateUrl: './empty-state-examples.component.html',
  imports: [TngEmptyState, ExampleBlockComponent, TngExampleDemo, TngExampleTitle],
})
export class EmptyStateExamplesComponent {
  readonly defaultHtml = computed(() => `<tng-empty-state></tng-empty-state>`);
  readonly withMessageHtml = computed(
    () => `<tng-empty-state
  title="No items found"
  message="Try adjusting your search or filters to find what you're looking for."
></tng-empty-state>`,
  );
  readonly withIconHtml = computed(
    () => `<tng-empty-state
  title="No data available"
  message="There are no items to display at this time."
  icon="📭"
></tng-empty-state>`,
  );
}
