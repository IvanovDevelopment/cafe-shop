import type { Product, ProductSize } from "@/entities/product";

export interface CartItem {
  id: string; // уникальный id позиции в корзине (Составвной - product.id + size)
  product: Product; // ссылка на товар
  quantity: number; // количество
  size?: ProductSize; // выбранный размер
  addonIds: string[]; // id выбранных добавок
  totalPrice: number; // цена позиции с учётом размера и добавок
}
