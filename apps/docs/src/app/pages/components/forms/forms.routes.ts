import { Routes } from '@angular/router';
import { autocompleteRoutes } from './autocomplete/autocomplete.routes';
import { checkboxRoutes } from './checkbox/checkbox.routes';
import { chipsRoutes } from './chips/chips.routes';
import { datepickerRoutes } from './datepicker/datepicker.routes';
import { timepickerRoutes } from './timepicker/timepicker.routes';
import { formFieldRoutes } from './form-field/form-field.routes';
import { textInputRoutes } from './text-input/text-input.routes';
import { numberInputRoutes } from './number-input/number-input.routes';
import { textareaRoutes } from './textarea/textarea.routes';
import { fileUploadRoutes } from './file-upload/file-upload.routes';
import { radioButtonRoutes } from './radio-button/radio-button.routes';
import { selectRoutes } from './select/select.routes';
import { sliderRoutes } from './slider/slider.routes';
import { slideToggleRoutes } from './slide-toggle/slide-toggle.routes';
import { buttonToggleRoutes } from './button-toggle/button-toggle.routes';

export const formsRoutes: Routes = [
  {
    path: 'forms/autocomplete',
    loadComponent: () =>
      import('./autocomplete/autocomplete-docs.component').then(
        (m) => m.AutocompleteDocsComponent,
      ),
    children: autocompleteRoutes,
    data: { title: 'Autocomplete – tailng', description: 'Autocomplete form control for tailng.' },
  },
  {
    path: 'forms/checkbox',
    loadComponent: () =>
      import('./checkbox/checkbox-docs.component').then(
        (m) => m.CheckboxDocsComponent,
      ),
    children: checkboxRoutes,
    data: { title: 'Checkbox – tailng', description: 'Checkbox form control for tailng.' },
  },
  {
    path: 'forms/chips',
    loadComponent: () =>
      import('./chips/chips-docs.component').then((m) => m.ChipsDocsComponent),
    children: chipsRoutes,
    data: { title: 'Chips – tailng', description: 'Chips input for tailng.' },
  },
  {
    path: 'forms/datepicker',
    loadComponent: () =>
      import('./datepicker/datepicker-docs.component').then(
        (m) => m.DatepickerDocsComponent,
      ),
    children: datepickerRoutes,
    data: { title: 'Datepicker – tailng', description: 'Datepicker component for tailng.' },
  },
  {
    path: 'forms/timepicker',
    loadComponent: () =>
      import('./timepicker/timepicker-docs.component').then(
        (m) => m.TimepickerDocsComponent,
      ),
    children: timepickerRoutes,
    data: { title: 'Timepicker – tailng', description: 'Timepicker component for tailng.' },
  },
  {
    path: 'forms/form-field',
    loadComponent: () =>
      import('./form-field/form-field-docs.component').then(
        (m) => m.FormFieldDocsComponent,
      ),
    children: formFieldRoutes,
    data: {
      title: 'Form Field – tailng',
      description: 'Form field wrapper: label, hint, errors, prefix/suffix.',
    },
  },
  {
    path: 'forms/text-input',
    loadComponent: () =>
      import('./text-input/text-input-docs.component').then(
        (m) => m.TextInputDocsComponent,
      ),
    children: textInputRoutes,
    data: { title: 'Text Input – tailng', description: 'Text input control for tailng.' },
  },
  {
    path: 'forms/number-input',
    loadComponent: () =>
      import('./number-input/number-input-docs.component').then(
        (m) => m.NumberInputDocsComponent,
      ),
    children: numberInputRoutes,
    data: { title: 'Number Input – tailng', description: 'Number input control for tailng.' },
  },
  {
    path: 'forms/textarea',
    loadComponent: () =>
      import('./textarea/textarea-docs.component').then(
        (m) => m.TextareaDocsComponent,
      ),
    children: textareaRoutes,
    data: { title: 'Textarea – tailng', description: 'Textarea control for tailng.' },
  },
  {
    path: 'forms/file-upload',
    loadComponent: () =>
      import('./file-upload/file-upload-docs.component').then(
        (m) => m.FileUploadDocsComponent,
      ),
    children: fileUploadRoutes,
    data: { title: 'File Upload – tailng', description: 'File upload control for tailng.' },
  },
  {
    path: 'forms/radio-button',
    loadComponent: () =>
      import('./radio-button/radio-button-docs.component').then(
        (m) => m.RadioButtonDocsComponent,
      ),
    children: radioButtonRoutes,
    data: { title: 'Radio Button – tailng', description: 'Radio button control for tailng.' },
  },
  {
    path: 'forms/select',
    loadComponent: () =>
      import('./select/select-docs.component').then((m) => m.SelectDocsComponent),
    children: selectRoutes,
    data: { title: 'Select – tailng', description: 'Select control for tailng.' },
  },
  {
    path: 'forms/slider',
    loadComponent: () =>
      import('./slider/slider-docs.component').then((m) => m.SliderDocsComponent),
    children: sliderRoutes,
    data: { title: 'Slider – tailng', description: 'Slider control for tailng.' },
  },
  {
    path: 'forms/slide-toggle',
    loadComponent: () =>
      import('./slide-toggle/slide-toggle-docs.component').then(
        (m) => m.SlideToggleDocsComponent,
      ),
    children: slideToggleRoutes,
    data: { title: 'Slide Toggle – tailng', description: 'Slide toggle control for tailng.' },
  },
  // NOTE: category route is /buttons/button-toggle, keep it under /components/buttons/button-toggle
  {
    path: 'buttons/button-toggle',
    loadComponent: () =>
      import('./button-toggle/button-toggle-docs.component').then(
        (m) => m.ButtonToggleDocsComponent,
      ),
    children: buttonToggleRoutes,
    data: { title: 'Button Toggle – tailng', description: 'Button toggle control for tailng.' },
  },
];
