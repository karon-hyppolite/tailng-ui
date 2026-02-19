# @tailng-ui/components

Owned, installable components built on top of `@tailng-ui/primitives`.

## TngButtonComponent

`TngButtonComponent` provides a styled wrapper over `TngButton` primitive behavior.

```ts
import { Component } from '@angular/core';
import { TngButtonComponent } from '@tailng-ui/components';

@Component({
  imports: [TngButtonComponent],
  template: `<tng-button tone="success">Continue</tng-button>`,
})
export class ExampleComponent {}
```
