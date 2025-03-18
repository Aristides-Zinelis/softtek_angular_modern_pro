import { TestBed } from '@angular/core/testing';
import { withAppName } from './app-name.token';
import { provideLogger } from './logger.provider';
import { LoggerService } from './logger.service';

/** Logger provider
 * - should provide a logger service with an app name
 * - should provide a logger service with a default app name
 */
describe('Logger provider', () => {
  it('should provide a logger service with an app name', () => {
    // Arrange
    TestBed.configureTestingModule({
      providers: [provideLogger(withAppName('Test App'))],
    });
    // Act
    const loggerService = TestBed.inject(LoggerService);
    // Assert
    expect(loggerService).toBeTruthy();
    const logMessage = loggerService.log('Test message');
    expect(logMessage).toContain('Test App');
  });
  it('should provide a logger service with a default app name', () => {
    // Arrange
    TestBed.configureTestingModule({
      providers: [provideLogger()],
    });
    // Act
    const loggerService = TestBed.inject(LoggerService);
    // Assert
    expect(loggerService).toBeTruthy();
    const logMessage = loggerService.log('Test message');
    expect(logMessage).toContain('Assets Board by default');
  });
});
