/**
 * Cotización de un activo
 */
export type Quote = {
  symbol: string;
  name: string;
  price: number; // Precio de la acción en dólares
  changesPercentage: number;
  change: number;
  marketCap: number;
  timestamp: number;
};
