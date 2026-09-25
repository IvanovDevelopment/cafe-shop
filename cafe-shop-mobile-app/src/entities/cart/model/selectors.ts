import type { CartItem } from "./types";

export const selectItems = (state: { items: CartItem[] }) => state.items;

export const selectTotalCount = (state: { items: CartItem[] }) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectTotalPrice = (state: { items: CartItem[] }) =>
  state.items.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
