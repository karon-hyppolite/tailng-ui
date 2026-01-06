import { bootstrapApplication } from '@angular/platform-browser';
import { provideIcons } from '@ng-icons/core';
import { bootstrapAlarm, bootstrapBell } from '@ng-icons/bootstrap-icons';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideIcons({
      bootstrapAlarm,
      bootstrapBell,
    }),
  ],
}).catch((err) => console.error(err));
