import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CurrencyPipe } from "@angular/common";
import { AuthModule } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import myAppConfig from '../config/my-app-config';
import { AuthInterceptorService } from './services/auth-interceptor.service';

// @ts-ignore
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    CurrencyPipe,
    importProvidersFrom(
      NgbPaginationModule,
      AuthModule.forRoot({
        ...myAppConfig.auth,
        httpInterceptor: myAppConfig.httpInterceptor,
      })
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ]
};
