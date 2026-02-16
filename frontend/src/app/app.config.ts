import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CurrencyPipe } from "@angular/common";
import { AuthModule } from '@auth0/auth0-angular'; // Change to AuthModule

import { routes } from './app.routes';
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import myAppConfig from '../config/my-app-config';
import { AuthInterceptorService } from './services/auth-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    CurrencyPipe,
    importProvidersFrom(
      NgbPaginationModule,
      AuthModule.forRoot({  // Use AuthModule.forRoot instead of provideAuth0
        ...myAppConfig.auth,
        httpInterceptor: {
          ...myAppConfig.httpInterceptor,
        },
      })
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ]
};
