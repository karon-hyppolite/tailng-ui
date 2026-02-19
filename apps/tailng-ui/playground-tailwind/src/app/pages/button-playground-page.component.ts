import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TngButton } from '@tailng-ui/components';
import { TngButton as TngButtonPrimitive } from '@tailng-ui/primitives';

@Component({
  selector: 'app-button-playground-page',
  imports: [RouterLink, TngButtonPrimitive, TngButton],
  templateUrl: './button-playground-page.component.html',
  styleUrl: './button-playground-page.component.css',
})
export class ButtonPlaygroundPageComponent {}
