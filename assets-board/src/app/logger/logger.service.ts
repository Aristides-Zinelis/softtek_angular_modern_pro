import { inject, Injectable } from "@angular/core";
import { APP_NAME } from "./app-name.token";

@Injectable()
export class LoggerService {
  private appName = inject(APP_NAME);

  public log(message: string) {
    console.log(`[${this.appName}]: ${message}`);
  }
}
