import { Stack } from "expo-router";
import { CartPage } from "@/pages/cart";

export default function CartRoute() {
  return (
    <>
      <Stack.Screen options={{ title: "Корзина" }} />
      <CartPage />
    </>
  );
}
