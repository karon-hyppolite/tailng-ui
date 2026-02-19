import type { RegistryItem } from '../registry.types';

const buttonComponentTsTemplate = `import { Component } from '@angular/core';
import { TngButtonComponent } from '@tailng-ui/components';

@Component({
  selector: 'app-button-demo',
  imports: [TngButtonComponent],
  templateUrl: './button-demo.component.html',
  styleUrl: './button-demo.component.css',
})
export class ButtonDemoComponent {}
`;

const buttonComponentHtmlTemplate = `<section class="button-grid">
  <tng-button>Primary</tng-button>
  <tng-button tone="success">Success</tng-button>
  <tng-button tone="danger">Danger</tng-button>
  <tng-button appearance="outline">Outline</tng-button>
  <tng-button appearance="ghost">Ghost</tng-button>
  <tng-button [disabled]="true">Disabled</tng-button>
</section>
`;

const buttonComponentCssTemplate = `:host {
  display: block;
}

.button-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
`;

export const buttonRegistryItem: RegistryItem = {
  dependencies: ['@tailng-ui/components', '@tailng-ui/primitives'],
  description: 'Styled button wrapper with primitive accessibility behavior.',
  files: [
    {
      content: buttonComponentTsTemplate,
      path: 'src/app/button-demo/button-demo.component.ts',
    },
    {
      content: buttonComponentHtmlTemplate,
      path: 'src/app/button-demo/button-demo.component.html',
    },
    {
      content: buttonComponentCssTemplate,
      path: 'src/app/button-demo/button-demo.component.css',
    },
  ],
  name: 'button',
};
