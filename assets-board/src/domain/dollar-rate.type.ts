/**
 * {
  "disclaimer": "Usage subject to terms: https://openexchangerates.org/terms",
  "license": "https://openexchangerates.org/license",
  "timestamp": 1741622400,
  "base": "USD",
  "rates": {
    "EUR": 0.92277
  }
}
 */

export type DollarRate = {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: {
    [key: string]: number;
  };
};
