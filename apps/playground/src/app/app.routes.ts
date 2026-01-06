import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  // Form Controls
  {
    path: 'form-controls/autocomplete',
    loadComponent: () =>
      import('./demos/form-controls/autocomplete/autocomplete-demo.component').then(
        (m) => m.AutocompleteDemoComponent
      ),
  },
  {
    path: 'form-controls/checkbox',
    loadComponent: () =>
      import('./demos/form-controls/checkbox/checkbox-demo.component').then(
        (m) => m.CheckboxDemoComponent
      ),
  },
  {
    path: 'form-controls/chips',
    loadComponent: () =>
      import('./demos/form-controls/chips/chips-demo.component').then(
        (m) => m.ChipsDemoComponent
      ),
  },
  {
    path: 'form-controls/datepicker',
    loadComponent: () =>
      import('./demos/form-controls/datepicker/datepicker-demo.component').then(
        (m) => m.DatepickerDemoComponent
      ),
  },
  {
    path: 'form-controls/form-field',
    loadComponent: () =>
      import('./demos/form-controls/form-field/form-field-demo.component').then(
        (m) => m.FormFieldDemoComponent
      ),
  },
  {
    path: 'form-controls/input',
    loadComponent: () =>
      import('./demos/form-controls/input/input-demo.component').then(
        (m) => m.InputDemoComponent
      ),
  },
  {
    path: 'form-controls/radio-button',
    loadComponent: () =>
      import('./demos/form-controls/radio-button/radio-button-demo.component').then(
        (m) => m.RadioButtonDemoComponent
      ),
  },
  {
    path: 'form-controls/select',
    loadComponent: () =>
      import('./demos/form-controls/select/select-demo.component').then(
        (m) => m.SelectDemoComponent
      ),
  },
  {
    path: 'form-controls/slider',
    loadComponent: () =>
      import('./demos/form-controls/slider/slider-demo.component').then(
        (m) => m.SliderDemoComponent
      ),
  },
  {
    path: 'form-controls/slide-toggle',
    loadComponent: () =>
      import('./demos/form-controls/slide-toggle/slide-toggle-demo.component').then(
        (m) => m.SlideToggleDemoComponent
      ),
  },
  {
    path: 'form-controls/timepicker',
    loadComponent: () =>
      import('./demos/form-controls/timepicker/timepicker-demo.component').then(
        (m) => m.TimepickerDemoComponent
      ),
  },
  // Buttons & Indicators
  {
    path: 'buttons-indicators/button',
    loadComponent: () =>
      import('./demos/buttons-indicators/button/button-demo.component').then(
        (m) => m.ButtonDemoComponent
      ),
  },
  {
    path: 'buttons-indicators/button-toggle',
    loadComponent: () =>
      import('./demos/buttons-indicators/button-toggle/button-toggle-demo.component').then(
        (m) => m.ButtonToggleDemoComponent
      ),
  },
  {
    path: 'buttons-indicators/badge',
    loadComponent: () =>
      import('./demos/buttons-indicators/badge/badge-demo.component').then(
        (m) => m.BadgeDemoComponent
      ),
  },
  {
    path: 'buttons-indicators/icon',
    loadComponent: () =>
      import('./demos/buttons-indicators/icon/icon-demo.component').then(
        (m) => m.IconDemoComponent
      ),
  },
  {
    path: 'buttons-indicators/ripples',
    loadComponent: () =>
      import('./demos/buttons-indicators/ripples/ripples-demo.component').then(
        (m) => m.RipplesDemoComponent
      ),
  },
  {
    path: 'buttons-indicators/progress-bar',
    loadComponent: () =>
      import('./demos/buttons-indicators/progress-bar/progress-bar-demo.component').then(
        (m) => m.ProgressBarDemoComponent
      ),
  },
  {
    path: 'buttons-indicators/progress-spinner',
    loadComponent: () =>
      import('./demos/buttons-indicators/progress-spinner/progress-spinner-demo.component').then(
        (m) => m.ProgressSpinnerDemoComponent
      ),
  },
  // Layout
  {
    path: 'layout/card',
    loadComponent: () =>
      import('./demos/layout/card/card-demo.component').then(
        (m) => m.CardDemoComponent
      ),
  },
  {
    path: 'layout/divider',
    loadComponent: () =>
      import('./demos/layout/divider/divider-demo.component').then(
        (m) => m.DividerDemoComponent
      ),
  },
  {
    path: 'layout/expansion-panel',
    loadComponent: () =>
      import('./demos/layout/expansion-panel/expansion-panel-demo.component').then(
        (m) => m.ExpansionPanelDemoComponent
      ),
  },
  {
    path: 'layout/grid-list',
    loadComponent: () =>
      import('./demos/layout/grid-list/grid-list-demo.component').then(
        (m) => m.GridListDemoComponent
      ),
  },
  {
    path: 'layout/list',
    loadComponent: () =>
      import('./demos/layout/list/list-demo.component').then(
        (m) => m.ListDemoComponent
      ),
  },
  {
    path: 'layout/tabs',
    loadComponent: () =>
      import('./demos/layout/tabs/tabs-demo.component').then(
        (m) => m.TabsDemoComponent
      ),
  },
  {
    path: 'layout/toolbar',
    loadComponent: () =>
      import('./demos/layout/toolbar/toolbar-demo.component').then(
        (m) => m.ToolbarDemoComponent
      ),
  },
  // Navigation
  {
    path: 'navigation/menu',
    loadComponent: () =>
      import('./demos/navigation/menu/menu-demo.component').then(
        (m) => m.MenuDemoComponent
      ),
  },
  {
    path: 'navigation/sidenav',
    loadComponent: () =>
      import('./demos/navigation/sidenav/sidenav-demo.component').then(
        (m) => m.SidenavDemoComponent
      ),
  },
  {
    path: 'navigation/stepper',
    loadComponent: () =>
      import('./demos/navigation/stepper/stepper-demo.component').then(
        (m) => m.StepperDemoComponent
      ),
  },
  {
    path: 'navigation/paginator',
    loadComponent: () =>
      import('./demos/navigation/paginator/paginator-demo.component').then(
        (m) => m.PaginatorDemoComponent
      ),
  },
  // Popups & Overlays
  {
    path: 'popups-overlays/dialog',
    loadComponent: () =>
      import('./demos/popups-overlays/dialog/dialog-demo.component').then(
        (m) => m.DialogDemoComponent
      ),
  },
  {
    path: 'popups-overlays/bottom-sheet',
    loadComponent: () =>
      import('./demos/popups-overlays/bottom-sheet/bottom-sheet-demo.component').then(
        (m) => m.BottomSheetDemoComponent
      ),
  },
  {
    path: 'popups-overlays/snackbar',
    loadComponent: () =>
      import('./demos/popups-overlays/snackbar/snackbar-demo.component').then(
        (m) => m.SnackbarDemoComponent
      ),
  },
  {
    path: 'popups-overlays/tooltip',
    loadComponent: () =>
      import('./demos/popups-overlays/tooltip/tooltip-demo.component').then(
        (m) => m.TooltipDemoComponent
      ),
  },
  // Data Table & Structure
  {
    path: 'data-table-structure/table',
    loadComponent: () =>
      import('./demos/data-table-structure/table/table-demo.component').then(
        (m) => m.TableDemoComponent
      ),
  },
  {
    path: 'data-table-structure/sort-header',
    loadComponent: () =>
      import('./demos/data-table-structure/sort-header/sort-header-demo.component').then(
        (m) => m.SortHeaderDemoComponent
      ),
  },
  {
    path: 'data-table-structure/tree',
    loadComponent: () =>
      import('./demos/data-table-structure/tree/tree-demo.component').then(
        (m) => m.TreeDemoComponent
      ),
  },
];
