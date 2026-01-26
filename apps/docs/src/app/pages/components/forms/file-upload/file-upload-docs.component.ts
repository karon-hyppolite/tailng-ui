import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { FileUploadOverviewComponent } from './overview/overview.component';
import { FileUploadApiComponent } from './api/api.component';
import { FileUploadStylingComponent } from './styling/styling.component';
import { FileUploadExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-file-upload',
  templateUrl: './file-upload-docs.component.html',
  imports: [
    ComponentShellComponent,
    FileUploadOverviewComponent,
    FileUploadApiComponent,
    FileUploadStylingComponent,
    FileUploadExamplesComponent,
  ],
})
export class FileUploadDocsComponent {}
