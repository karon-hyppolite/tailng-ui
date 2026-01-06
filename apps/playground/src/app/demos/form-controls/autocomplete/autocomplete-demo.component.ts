import { Component } from '@angular/core';
import { TailngAutocompleteComponent } from '@tailng/ui';

@Component({
  selector: 'playground-autocomplete-demo',
  standalone: true,
  imports: [TailngAutocompleteComponent],
  templateUrl: './autocomplete-demo.component.html',
})
export class AutocompleteDemoComponent {}

