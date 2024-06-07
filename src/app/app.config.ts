import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { TuiRootModule } from '@taiga-ui/core';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {AuthService} from "./auth/auth.service";
import {authInterceptorFn} from "./auth/auth-interceptor.fn";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(TuiRootModule),
    provideHttpClient(
      withInterceptors([authInterceptorFn])
    ),
    {
      provide: APP_INITIALIZER,
      useFactory:(auth: AuthService)=>{
        return ()=>auth.init();
      },
      multi: true,
      deps: [AuthService]
    },

  ],
};
