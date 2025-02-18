export type HiLo = 'High' | 'Low';

export type Category = {
  id: number;
  name: string;
  risk: HiLo;
  liquidity: HiLo;
};