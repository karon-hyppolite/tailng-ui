import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'playground-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  categories = [
    {
      name: 'Form Controls',
      components: [
        { name: 'Autocomplete', route: '/form-controls/autocomplete' },
        { name: 'Checkbox', route: '/form-controls/checkbox' },
        { name: 'Chips', route: '/form-controls/chips' },
        { name: 'Datepicker', route: '/form-controls/datepicker' },
        { name: 'Form Field', route: '/form-controls/form-field' },
        { name: 'Input', route: '/form-controls/input' },
        { name: 'Radio Button', route: '/form-controls/radio-button' },
        { name: 'Select', route: '/form-controls/select' },
        { name: 'Slider', route: '/form-controls/slider' },
        { name: 'Slide Toggle', route: '/form-controls/slide-toggle' },
        { name: 'Timepicker', route: '/form-controls/timepicker' },
      ],
    },
    {
      name: 'Buttons & Indicators',
      components: [
        { name: 'Button', route: '/buttons-indicators/button' },
        { name: 'Button Toggle', route: '/buttons-indicators/button-toggle' },
        { name: 'Badge', route: '/buttons-indicators/badge' },
        { name: 'Icon', route: '/buttons-indicators/icon' },
        { name: 'Ripples', route: '/buttons-indicators/ripples' },
        { name: 'Progress Bar', route: '/buttons-indicators/progress-bar' },
        { name: 'Progress Spinner', route: '/buttons-indicators/progress-spinner' },
      ],
    },
    {
      name: 'Layout',
      components: [
        { name: 'Card', route: '/layout/card' },
        { name: 'Divider', route: '/layout/divider' },
        { name: 'Expansion Panel', route: '/layout/expansion-panel' },
        { name: 'Grid List', route: '/layout/grid-list' },
        { name: 'List', route: '/layout/list' },
        { name: 'Tabs', route: '/layout/tabs' },
        { name: 'Toolbar', route: '/layout/toolbar' },
      ],
    },
    {
      name: 'Navigation',
      components: [
        { name: 'Menu', route: '/navigation/menu' },
        { name: 'Sidenav', route: '/navigation/sidenav' },
        { name: 'Stepper', route: '/navigation/stepper' },
        { name: 'Paginator', route: '/navigation/paginator' },
      ],
    },
    {
      name: 'Popups & Overlays',
      components: [
        { name: 'Dialog', route: '/popups-overlays/dialog' },
        { name: 'Bottom Sheet', route: '/popups-overlays/bottom-sheet' },
        { name: 'Snackbar', route: '/popups-overlays/snackbar' },
        { name: 'Tooltip', route: '/popups-overlays/tooltip' },
      ],
    },
    {
      name: 'Data Table & Structure',
      components: [
        { name: 'Table', route: '/data-table-structure/table' },
        { name: 'Sort Header', route: '/data-table-structure/sort-header' },
        { name: 'Tree', route: '/data-table-structure/tree' },
      ],
    },
  ];
}

