import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TngButtonComponent } from '@tailng-ui/components';
import { TngButton } from '@tailng-ui/primitives';

@Component({
  selector: 'app-button-playground-page',
  imports: [RouterLink, TngButton, TngButtonComponent],
  templateUrl: './button-playground-page.component.html',
  styleUrl: './button-playground-page.component.css',
})
export class ButtonPlaygroundPageComponent {}
