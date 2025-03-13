/**
 * A Currency Value Object with validation and formatting
 */
export class Currency {

  constructor(private readonly value: number, private readonly symbol: string) {
    if (value < 0) {
      throw new Error("Currency value cannot be negative");
    }
  }

  /**
   * Returns a new Currency instance from a string
   * @param {string} stringCurrency - The string to convert to a Currency instance
   * @returns {Currency} The new Currency instance
   */
  static fromString(stringCurrency: string): Currency {
    const symbol = stringCurrency.slice(-3);
    const stringValue = stringCurrency.slice(0, -3);
    const value = Number.parseFloat(stringValue);
    if (Number.isNaN(value)) {
      throw new Error("Invalid currency value");
    }
    return new Currency(value, symbol);
  }

  /**
   * Returns a string with the currency value formatted with 2 decimals no thousands separator and no symbol
   * @returns {string} The formatted currency value
   */
  toShortString(): string {
    return this.value.toFixed(2);
  }

  /**
   * Returns a string with the currency value formatted with thousands separator and symbol
   * @returns {string} The formatted currency value
   */
  toLongString(): string {
    return `${this.value.toLocaleString(undefined, {
      style: "currency",
      currency: this.symbol,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

}
