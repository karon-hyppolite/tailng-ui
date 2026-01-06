import { Component, signal } from '@angular/core';
import { TailngAutocompleteComponent } from '@tailng/ui';
import { Country, COUNTRY_LIST } from '../../util/country-list';
import { toFlagEmoji } from '../../util/common.util';


@Component({
  selector: 'playground-autocomplete-demo',
  standalone: true,
  imports: [TailngAutocompleteComponent],
  templateUrl: './autocomplete-demo.component.html',
})
export class AutocompleteDemoComponent {

  // Filtered options shown in autocomplete
  options = signal<Country[]>([]);

  // Selected value (for demo display)
  selectedCountry = signal<Country | null>(null);

  // Display function for input + list
  displayCountry = (country: Country) => `${toFlagEmoji(country.code)} ${country.name}`;

  // Called when user types
  onSearch(term: string) {
    const value = term.toLowerCase().trim();

    if (!value) {
      this.options.set([]);
      return;
    }

    // Simulate API filtering
    const filtered = COUNTRY_LIST.filter(country =>
      country.name.toLowerCase().includes(value) ||
      country.iso.toLowerCase().includes(value)
    );

    this.options.set(filtered);
  }

  // Called when user selects an option
  onSelected(country: Country) {
    this.selectedCountry.set(country);
  }

  onClosed(reason: string) {
    console.log('Autocomplete closed:', reason);
  }
}
