export interface ProductItem {
  id: number;
  name: string;
  count: number;
  date: number;
}

export interface ProductGroup {
  date: string;
  group: ProductItem[];
}
