import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { defaultAppName } from "./app-name.token";
import { LoggerService } from "./logger.service";

export function provideLogger(
  appName: EnvironmentProviders = defaultAppName
): EnvironmentProviders {
  return makeEnvironmentProviders([appName, LoggerService]);
}
