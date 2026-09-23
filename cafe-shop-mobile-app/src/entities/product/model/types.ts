export type ProductSize = "S" | "M" | "L";

export interface ProductAddon {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  availableSizes?: ProductSize[];
  addons?: ProductAddon[];
  isPopular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}
