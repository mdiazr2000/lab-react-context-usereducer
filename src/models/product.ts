export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: number;
  fastDelivery: boolean;
  ratings: number;
  qty: number;
}

export interface ProductStateType {
  products: Product[];
  cart: Product[];
}

export interface ProductFiltersType {
  byStock: boolean;
  byFastDelivery: boolean;
  byRating: number;
  searchQuery: string;
  sort?: string;
}
