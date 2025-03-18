import { inject, Injectable } from '@angular/core';
import { APP_NAME } from './app-name.token';

@Injectable()
export class LoggerService {
  private appName = inject(APP_NAME);

  public log(message: string): string {
    const timestamp = this.getTimestamp();
    const icon = this.getIcon('log');
    const logMessage = `[${timestamp}] [${this.appName}] ${icon} ${message}`;
    console.log(logMessage);
    return logMessage;
  }

  public warn(message: string): string {
    const timestamp = this.getTimestamp();
    const icon = this.getIcon('warn');
    const logMessage = `[${timestamp}] [${this.appName}] ${icon} ${message}`;
    console.warn(logMessage);
    return logMessage;
  }

  public error(message: string): string {
    const timestamp = this.getTimestamp();
    const icon = this.getIcon('error');
    const logMessage = `[${timestamp}] [${this.appName}] ${icon} ${message}`;
    console.error(logMessage);
    return logMessage;
  }

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private getIcon(category: string): string {
    switch (category) {
      case 'log':
        return '🔍';
      case 'warn':
        return '⚠️';
      case 'error':
        return '❌';
      default:
        return '🔍';
    }
  }
}
