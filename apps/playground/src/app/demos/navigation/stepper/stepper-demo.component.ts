import { Component } from '@angular/core';
import { TailngStepperComponent } from '@tailng/ui';

@Component({
  selector: 'playground-stepper-demo',
  standalone: true,
  imports: [TailngStepperComponent],
  templateUrl: './stepper-demo.component.html',
})
export class StepperDemoComponent {}

