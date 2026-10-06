import { Stack } from "expo-router";
import { CheckoutPage } from "@/pages/checkout";

export default function CheckoutRoute() {
  return (
    <>
      <Stack.Screen options={{ title: "Оформление" }} />
      <CheckoutPage />
    </>
  );
}
