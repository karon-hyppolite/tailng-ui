<div align="center">
  <img
    src="https://raw.githubusercontent.com/tailng/tailng-ui/main/apps/tailng-ui/docs/src/assets/logo.svg"
    width="96"
    alt="TailNG logo"
  />
</div>

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
