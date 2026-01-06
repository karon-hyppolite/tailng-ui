import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { bootstrapAlarm, bootstrapBell } from '@ng-icons/bootstrap-icons';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideIcons({
      bootstrapAlarm,
      bootstrapBell,
    }),
  ],
}).catch((err) => console.error(err));
