import { Component } from '@angular/core';
import { ComponentShellComponent } from '../../../../shared/component-shell/component-shell.component';
import { ConnectedOverlayOverviewComponent } from './overview/overview.component';
import { ConnectedOverlayApiComponent } from './api/api.component';
import { ConnectedOverlayStylingComponent } from './styling/styling.component';
import { ConnectedOverlayExamplesComponent } from './examples/examples.component';

@Component({
  standalone: true,
  selector: 'docs-connected-overlay',
  templateUrl: './connected-overlay-docs.component.html',
  imports: [
    ComponentShellComponent,
    ConnectedOverlayOverviewComponent,
    ConnectedOverlayApiComponent,
    ConnectedOverlayStylingComponent,
    ConnectedOverlayExamplesComponent,
  ],
})
export class ConnectedOverlayDocsComponent {}
