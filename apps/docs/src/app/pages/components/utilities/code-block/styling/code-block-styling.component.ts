import { Component, computed } from '@angular/core';
import { TngCodeBlock } from '@tailng-ui/ui/utilities';
import { ExampleBlockComponent, TngExampleDemo } from '../../../../../shared/example-block/example-block.component';

@Component({
  standalone: true,
  selector: 'docs-code-block-styling',
  templateUrl: './code-block-styling.component.html',
  imports: [TngCodeBlock, ExampleBlockComponent, TngExampleDemo],
})
export class CodeBlockStylingComponent {
  readonly snippet = computed(() => `function hello() {
  return 'world';
}`);

  readonly containerHtml = computed(
    () => `
<tng-code-block
  [content]="snippet()"
  [slot]="{ container: 'rounded-xl border-2 border-primary bg-bg' }"
>
</tng-code-block>
`,
  );

  readonly bodyHtml = computed(
    () => `
<tng-code-block
  [content]="snippet()"
  [slot]="{ body: 'ring-2 ring-primary/30 rounded-lg' }"
>
</tng-code-block>
`,
  );

  readonly gutterHtml = computed(
    () => `
<tng-code-block
  [content]="snippet()"
  [showLineNumbers]="true"
  [slot]="{ gutter: '!text-primary/70' }"
>
</tng-code-block>
`,
  );

  readonly preHtml = computed(
    () => `
<tng-code-block
  [content]="snippet()"
  [slot]="{ pre: 'text-sm p-4 bg-bg/50' }"
>
</tng-code-block>
`,
  );

  readonly codeHtml = computed(
    () => `
<tng-code-block
  [content]="snippet()"
  [slot]="{ code: 'font-mono text-sm' }"
>
</tng-code-block>
`,
  );

  readonly copyWrapperHtml = computed(
    () => `
<tng-code-block
  [content]="snippet()"
  [slot]="{ copyWrapper: 'top-3 right-3' }"
>
</tng-code-block>
`,
  );
}
