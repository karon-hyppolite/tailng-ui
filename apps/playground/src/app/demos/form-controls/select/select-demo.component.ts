import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TailngSelectComponent } from '@tailng/ui';

interface Country {
  code: string;
  name: string;
  dialCode: string;
}

@Component({
  selector: 'playground-select-demo',
  standalone: true,
  imports: [ReactiveFormsModule, TailngSelectComponent],
  templateUrl: './select-demo.component.html',
})
export class SelectDemoComponent {
  countries = signal<Country[]>([
    { code: 'IN', name: 'India', dialCode: '+91' },
    { code: 'AE', name: 'UAE', dialCode: '+971' },
    { code: 'US', name: 'United States', dialCode: '+1' },
    { code: 'UK', name: 'United Kingdom', dialCode: '+44' },
    { code: 'DE', name: 'Germany', dialCode: '+49' },
    { code: 'FR', name: 'France', dialCode: '+33' },
    { code: 'SG', name: 'Singapore', dialCode: '+65' },
  ]);

  // ✅ CVA value source
  readonly countryCtrl = new FormControl<Country | null>(null);

  lastCloseReason = signal<string>('-');

  displayCountry = (c: Country) => `${c.name} (${c.dialCode})`;

  onClosed(reason: string) {
    this.lastCloseReason.set(reason);
    console.log('Select closed:', reason);
  }

  clear() {
    this.countryCtrl.setValue(null);
    this.countryCtrl.markAsDirty();
    this.countryCtrl.markAsTouched();
  }
}
