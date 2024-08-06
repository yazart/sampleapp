import { provideHttpClient, withInterceptors } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import {
  APP_INITIALIZER,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { TuiRootModule } from '@taiga-ui/core';

import { routes } from './app.routes';
import { AuthService } from './auth/auth.service';
import { authInterceptorFn } from './auth/auth-interceptor.fn';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    importProvidersFrom(TuiRootModule),
    provideHttpClient(withInterceptors([authInterceptorFn])),
    {
      provide: APP_INITIALIZER,
      useFactory: (auth: AuthService) => async () => auth.init(),
      multi: true,
      deps: [AuthService],
    },
  ],
};
