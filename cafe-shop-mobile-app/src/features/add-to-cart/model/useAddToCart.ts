import { useCart } from "@/entities/cart";
import type { Product, ProductSize } from "@/entities/product";
import { buildCartItem } from "./buildCartItem";

interface AddToCartParams {
  product: Product;
  quantity?: number;
  size?: ProductSize;
  addonIds?: string[];
}

export function useAddToCart() {
  const { addItem } = useCart();

  return ({ product, quantity, size, addonIds }: AddToCartParams) => {
    const item = buildCartItem({ product, quantity, size, addonIds });
    addItem(item);
  };
}
