import { beforeEach, describe, expect, it } from "vitest";
import { Currency } from "./currency.class";

/**
 * Currency class
 * - Currency creation
 *   - should create a currency instance for a positive value
 *   - should throw an error for a negative value
 * - Currency from string
 *   - should create a currency instance from a valid string
 *   - should throw an error for an invalid string
 * - Currency formatting
 *   - should format the currency short value with 2 decimals
 *   - should format the currency long value with thousands separator and symbol
 */
describe("Currency class", () => {
  describe("Currency creation", () => {
    it("should create a currency instance for a positive value", () => {
      // Arrange
      const value = 10;
      const symbol = "USD";
      // Act
      const currency = new Currency(value, symbol);
      // Assert
      expect(currency).toBeDefined();
    });
    it("should throw an error for a negative value", () => {
      // Arrange
      const value = -10;
      const symbol = "USD";
      // Act & Assert
      expect(() => new Currency(value, symbol)).toThrowError(
        "Currency value cannot be negative"
      );
    });
  });
  describe("Currency from string", () => {
    it("should create a currency instance from a valid string", () => {
      // Arrange
      const stringCurrency = "10.00USD";
      // Act
      const currency = Currency.fromString(stringCurrency);
      // Assert
      expect(currency).toBeDefined();
      //expect(currency.toShortString()).toBe("10.00");
    });
    it("should throw an error for an invalid string", () => {
      // Arrange
      const stringCurrency = "invalid";
      // Act & Assert
      expect(() => Currency.fromString(stringCurrency)).toThrowError(
        "Invalid currency value"
      );
    });
  });
  describe("Currency formatting", () => {
    let currencySUT: Currency;
    beforeEach(() => {
      // Arrange
      const value = 10000;
      const symbol = "USD";
      currencySUT = new Currency(value, symbol);
    });
    it("should format the currency short value with 2 decimals", () => {
      // Act
      const shortString = currencySUT.toShortString();
      // Assert
      expect(shortString).toBe("10000.00");
    });
    it("should format the currency long value with thousands separator and symbol", () => {
      // Act
      const longString = currencySUT.toLongString();
      // Assert
      expect(longString).toContain("10.000,00");
      expect(longString).toContain("US$");
    });
  });
});
