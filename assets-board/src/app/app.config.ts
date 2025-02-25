import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";

import { provideHttpClient } from "@angular/common/http";
import { routes } from "./app.routes";
import { withAppName } from "./logger/app-name.token";
import { provideLogger } from "./logger/logger.provider";

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideLogger(withAppName("Assets Board")),
  ],
};
