import { Quote } from "./quote.type";

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

export type MiniProfile = {
  symbol: string;
  ceo: string;
  quote?: Quote;
};
