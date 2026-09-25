import { selectItems, selectTotalCount, selectTotalPrice } from "./selectors";
import { useCartStore } from "./store";

export function useCart() {
  const items = useCartStore(selectItems);
  const totalCount = useCartStore(selectTotalCount);
  const totalPrice = useCartStore(selectTotalPrice);

  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  return {
    items,
    totalCount,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
