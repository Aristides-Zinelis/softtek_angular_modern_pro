export type Asset = {
  id: number;
  name: string;
  categoryId: number
  quantity: number;
  value: number;
};

export const NULL_ASSET: Asset = {
  id: 0,
  name: '',
  categoryId: 0,
  quantity: 0,
  value: 0
}