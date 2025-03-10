/**
 * Ficha grande de una empresa cotizada
 */
export type Profile = {
  symbol: string;
  website: string;
  description: string;
  ceo: string;
  sector: string;
  country: string;
  fullTimeEmployees: string;
  price: number;
  mktCap: number;
};

/**
 * Ficha pequeña de una empresa cotizada
 */
export type MiniProfile = {
  symbol: string;
  ceo: string;
  website: string;
};
