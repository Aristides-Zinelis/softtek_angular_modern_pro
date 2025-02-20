import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
} from "@angular/core";

export const APP_NAME = new InjectionToken<string>("APP_NAME");

export const defaultAppName = makeEnvironmentProviders([
  {
    provide: APP_NAME,
    useValue: "Assets Board by default",
  },
]);

export function withAppName(name: string): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: APP_NAME,
      useValue: name,
    },
  ]);
}
