# @tailng-ui/components

Owned, installable components built on top of `@tailng-ui/primitives`.

## TngButton

`TngButton` provides a styled wrapper over the `tngButton` primitive behavior.

```ts
import { Component } from '@angular/core';
import { TngButton } from '@tailng-ui/components';

@Component({
  imports: [TngButton],
  template: `<tng-button tone="success">Continue</tng-button>`,
})
export class ExampleComponent {}
```
