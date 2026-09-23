import { Stack } from "expo-router";
import { HomePage } from "@/pages/home";
import { products, categories } from "@/shared/lib/mock-data";

export default function HomeRoute() {
  return (
    <>
      <Stack.Screen options={{ title: "Cafe Shop" }} />
      <HomePage categories={categories} products={products} />
    </>
  );
}
