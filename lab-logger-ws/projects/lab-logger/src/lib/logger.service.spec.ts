import { TestBed } from '@angular/core/testing';
import { APP_NAME } from './app-name.token';
import { LoggerService } from './logger.service';

/**
 * Logger Service
 * - log
 *  - should log a message with a timestamp, app name, icon, and message
 * - warn
 * - error
 */
describe('Logger Service', () => {
  let loggerService: LoggerService;
  const appName = 'Test App';
  beforeEach(() => {
    // Arrange
    TestBed.configureTestingModule({
      providers: [
        { provide: LoggerService, useClass: LoggerService },
        { provide: APP_NAME, useValue: appName },
      ],
    });
    loggerService = TestBed.inject(LoggerService);
  });
  describe('log', () => {
    it('should log a message with a timestamp, app name, icon, and message', () => {
      // Arrange
      const message = 'Test message';
      // Act
      const logMessage = loggerService.log(message);
      // Assert
      expect(logMessage).toContain(message);
      expect(logMessage).toContain('🔍');
      expect(logMessage).toContain(appName);
    });
  });
  //describe('warn', () => {});
  //describe('error', () => {});
});
