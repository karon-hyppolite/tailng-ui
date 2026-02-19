# @tailng-ui/primitives

Unstyled accessibility and behavior primitives for TailNG UI.

## TngButton

`TngButton` is a standalone directive that enhances native `button` and `a` elements:

- Defaults `button[tngButton]` to `type="button"` to avoid accidental form submission.
- Supports ARIA attributes for toggle/menu disclosure patterns.
- Handles disabled interaction for anchors and exposes `data-disabled` for styling.
- Applies button keyboard behavior to anchors without `href`.

### Usage

```ts
import { Component } from '@angular/core';
import { TngButton } from '@tailng-ui/primitives';

@Component({
  imports: [TngButton],
  template: `
    <button tngButton type="button">Action</button>
    <a tngButton [disabled]="true">Disabled Link Button</a>
  `,
})
export class ExampleComponent {}
```
