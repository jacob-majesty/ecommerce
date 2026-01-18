import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from "@angular/common/http";
import { CurrencyPipe } from "@angular/common";

import { routes } from './app.routes';
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    CurrencyPipe,
    importProvidersFrom(NgbPaginationModule)
  ]
};
