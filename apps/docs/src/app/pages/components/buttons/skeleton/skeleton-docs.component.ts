import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { SkeletonOverviewComponent } from './overview/overview.component';
import { SkeletonApiComponent } from './api/api.component';
import { SkeletonStylingComponent } from './styling/styling.component';
import { SkeletonExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-skeleton',
  templateUrl: './skeleton-docs.component.html',
  imports: [
    ComponentShellComponent,
    SkeletonOverviewComponent,
    SkeletonApiComponent,
    SkeletonStylingComponent,
    SkeletonExamplesComponent,
  ],
})
export class SkeletonDocsComponent {}
