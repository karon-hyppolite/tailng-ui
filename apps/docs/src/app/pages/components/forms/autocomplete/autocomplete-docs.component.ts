import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { AutocompleteOverviewComponent } from './overview/overview.component';
import { AutocompleteApiComponent } from './api/api.component';
import { AutocompleteStylingComponent } from './styling/styling.component';
import { AutocompleteExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-autocomplete',
  templateUrl: './autocomplete-docs.component.html',
  imports: [
    ComponentShellComponent,
    AutocompleteOverviewComponent,
    AutocompleteApiComponent,
    AutocompleteStylingComponent,
    AutocompleteExamplesComponent,
  ],
})
export class AutocompleteDocsComponent {}
