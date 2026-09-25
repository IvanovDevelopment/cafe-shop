import type { Product, ProductSize } from "@/entities/product";
import type { CartItem } from "@/entities/cart";

interface BuildCartItemParams {
  product: Product;
  quantity?: number;
  size?: ProductSize;
  addonIds?: string[];
}

export function buildCartItem({
  product,
  quantity = 1,
  size,
  addonIds = [],
}: BuildCartItemParams): CartItem {
  // Уникальный id: товар + размер + отсортированные добавки
  const sortedAddons = [...addonIds].sort();
  const id = [product.id, size ?? "default", ...sortedAddons].join("_");

  // Считаем цену добавок
  const addonsTotal = (product.addons ?? [])
    .filter((a) => addonIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  const totalPrice = product.price + addonsTotal;

  return {
    id,
    product,
    quantity,
    size,
    addonIds: sortedAddons,
    totalPrice,
  };
}
